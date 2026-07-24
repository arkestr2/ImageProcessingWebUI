export type JobStatus = {
    jobId: string;
    status: "queued" | "processing" | "done";
    startedAt: Date;
    resultImageUrl?: string;
    finishedAt?: Date;
};
