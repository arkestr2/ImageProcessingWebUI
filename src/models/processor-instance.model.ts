import type { ProcessorParameter } from "./processor-parameter.model";

export type ProcessorInstance = {
    id: string;
    semanticId: string;
    displayName: string;
    type: string;
    parameters: ProcessorParameter[];
};
