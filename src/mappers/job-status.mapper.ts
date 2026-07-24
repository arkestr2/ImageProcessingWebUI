import type { JobStatusDto } from "../dto/job-status.dto";
import type { JobStatus } from "../models/job-status.model";

export function mapJobStatusDtoToModel(dto: JobStatusDto): JobStatus {
    return {
        jobId: dto.job_id,
        status: dto.status,
        startedAt: new Date(dto.started_at),
        resultImageUrl: dto.status === "done" ? dto.result_image_url : undefined,
        finishedAt: dto.status === "done" ? new Date(dto.finished_at) : undefined,
    };
}
