import { createContext, use } from "react";

type PipelineContextType = {
    onDeleteProcessor: (id?: string) => void;
    onUpdateParameterValue: (processorId: string, paramName: string, value: string) => void;
    parameterValues: Record<string, Record<string, string>>;
};

export const PipelineContext = createContext<PipelineContextType | null>(null);

export function usePipelineContext() {
    const context = use(PipelineContext);
    if (!context) {
        throw new Error("usePipelineContext must be used within PipelineProvider");
    }

    return context;
}
