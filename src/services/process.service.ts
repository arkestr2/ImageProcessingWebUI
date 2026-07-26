import { apiClient } from "../api/client";
import type { JobStatusDto } from "../dto/job-status.dto";
import { mapJobStatusDtoToModel } from "../mappers/job-status.mapper";
import { mapToProcessRequest } from "../mappers/process-request.mapper";
import type { ProcessorInstance } from "../models/processor-instance.model";

export async function submitJob(imageId: string, processors: ProcessorInstance[], parameterValues: Record<string, Record<string, string>>): Promise<string> {
    const body = mapToProcessRequest(imageId, processors, parameterValues);

    const dto = await apiClient.post<JobStatusDto>("/process", body);
    const job = mapJobStatusDtoToModel(dto);
    return job.jobId;
}

const POLL_INTERVAL_MS = 1000;
const MAX_POLL_ATTEMPTS = 10;

export function pollJobStatus(jobId: string, onDone: (resultImageId: string) => void, onError: (err: Error) => void): () => void {
    let stopped = false;
    let attempts = 0;

    const poll = async () => {
        if (stopped) return;
        if (++attempts > MAX_POLL_ATTEMPTS) {
            onError(new Error("Processing timed out"));
            return;
        }

        try {
            const dto = await apiClient.get<JobStatusDto>(`/process/jobs/${jobId}`);
            const job = mapJobStatusDtoToModel(dto);

            if (job.status === "done" && job.resultImageId) {
                onDone(job.resultImageId);
            } else if (job.status === "queued" || job.status === "processing") {
                setTimeout(poll, POLL_INTERVAL_MS);
            }
        } catch (e) {
            onError(e instanceof Error ? e : new Error(String(e)));
        }
    };

    poll();

    return () => {
        stopped = true;
    };
}
