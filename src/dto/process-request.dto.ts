export type ProcessStepDto = {
    processor_id: string;
    order: number;
    parameters: Record<string, unknown>;
};

export type ProcessRequestDto = {
    image_id: string;
    steps: ProcessStepDto[];
};
