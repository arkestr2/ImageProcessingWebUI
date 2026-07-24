import type { ProcessorParameter } from "./processor-parameter.model";

export type ProcessorTemplate = {
    semanticId: string;
    displayName: string;
    type: string;
    parameters: ProcessorParameter[];
};
