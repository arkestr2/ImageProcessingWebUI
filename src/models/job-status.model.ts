export type JobStatus = {
    jobId: string;
    status: "queued" | "processing" | "done";
    startedAt: Date;
    resultImageId?: string;
    finishedAt?: Date;
};
