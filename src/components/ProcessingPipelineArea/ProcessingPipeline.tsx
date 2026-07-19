import { useState } from "react"
import { ProcessingPipelineHeader } from "./ProcessingPipelineHeader"
import { ProcessorList } from "./ProcessorList"
import { AddProcessorModal } from "./AddProcessorModal"
import type { ProcessorTemplate } from "../../models/processor-template.model"
import type { ProcessorInstance } from "../../models/processor-instance.model"
import { PipelineContext } from "./pipeline.context"

type Props = {
    className?: string
}

export function ProcessingPipeline({ className }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [processors, setProcessors] = useState<ProcessorInstance[]>([])
    const [parameterValues, setParameterValues] = useState<Record<string, Record<string, string>>>({})

    const handleAddProcessor = (processor: ProcessorTemplate) => {
        const id = crypto.randomUUID()
        setProcessors([...processors, { ...processor, id }])

        const defaultValues: Record<string, string> = {}
        processor.parameters.forEach(param => {
            defaultValues[param.displayName] = param.defaultValue
        })
        setParameterValues(prev => ({ ...prev, [id]: defaultValues }))
        
        setIsModalOpen(false)
    }

    const handleDeleteProcessor = (id?: string) => {
        setProcessors(processors.filter(p => p.id !== id))
    }

    const handleUpdateParameterValue = (processorId: string, paramName: string, value: string) => {
        setParameterValues(prev => ({
            ...prev,
            [processorId]: {
                ...prev[processorId],
                [paramName]: value
            }
        }))
    }

    return (
        <PipelineContext value={{
            onDeleteProcessor: handleDeleteProcessor,
            onUpdateParameterValue: handleUpdateParameterValue,
            parameterValues: parameterValues
        }}>
            <div className={`border-2 border-border h-full lg:max-h-180 ${className ?? ""}`}>
                <ProcessingPipelineHeader onAddClick={() => setIsModalOpen(true)} />
                <div className="">
                    <ProcessorList
                        className="m-4"
                        processors={processors}
                    />
                    <AddProcessorModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleAddProcessor}
                    />
                </div>
            </div>
        </PipelineContext>
    )
}
