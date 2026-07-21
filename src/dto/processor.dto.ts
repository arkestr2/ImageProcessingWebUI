import type { ProcessorParameterDto } from "./processor-parameter.dto";

export type ProcessorDto = {
    processor_id: string;
    display_name: string;
    type: string;
    parameters: ProcessorParameterDto[];
};
