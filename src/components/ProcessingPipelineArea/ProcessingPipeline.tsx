import { useState } from "react"
import { ProcessingPipelineHeader } from "./ProcessingPipelineHeader"
import { ProcessorList } from "./ProcessorList"
import { AddProcessorModal } from "./AddProcessorModal"
import type { Processor } from "../../models/processor.model"

type Props = {
    className?: string
}

export function ProcessingPipeline({ className }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [processors, setProcessors] = useState<Processor[]>([])

    const handleAddProcessor = (processor: Processor) => {
        setProcessors([...processors, processor])
        setIsModalOpen(false)
    }

    return (
        <div className={`bg-amber-700 ${className ?? ""}`}>
            <ProcessingPipelineHeader onAddClick={() => setIsModalOpen(true)} />
            <ProcessorList
                className=""
                processors={processors}
            />
            <AddProcessorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddProcessor}
            />
        </div>
    )
}
