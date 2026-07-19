import { createContext, use } from "react"

type PipelineContextType = {
    onDeleteProcessor: (id?: string) => void
}

export const PipelineContext = createContext<PipelineContextType | null>(null)

export function usePipelineContext() {
    const context = use(PipelineContext)
    if (!context) {
        throw new Error("usePipelineContext must be used within PipelineProvider")
    }

    return context
}