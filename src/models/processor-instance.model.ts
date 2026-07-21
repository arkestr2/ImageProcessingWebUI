import type { ProcessorParameter } from "./processor-parameter.model";

export type ProcessorInstance = {
    id: string;
    displayName: string;
    type: string;
    parameters: ProcessorParameter[];
};
