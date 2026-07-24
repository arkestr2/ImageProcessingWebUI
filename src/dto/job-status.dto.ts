export type JobQueuedDto = {
    job_id: string;
    status: "queued";
    started_at: string;
};

export type JobProcessingDto = {
    job_id: string;
    status: "processing";
    started_at: string;
};

export type JobDoneDto = {
    job_id: string;
    status: "done";
    result_image_url: string;
    started_at: string;
    finished_at: string;
};

export type JobStatusDto = JobQueuedDto | JobProcessingDto | JobDoneDto;
