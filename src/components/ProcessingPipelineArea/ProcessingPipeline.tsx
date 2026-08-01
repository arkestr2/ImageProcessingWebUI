import { useState } from "react";
import { ProcessingPipelineHeader } from "./ProcessingPipelineHeader";
import { ProcessorList } from "./ProcessorList";
import { AddProcessorModal } from "./AddProcessorModal";
import type { ProcessorTemplate } from "../../models/processor-template.model";
import type { ProcessorInstance } from "../../models/processor-instance.model";
import { PipelineContext } from "../../contexts/pipeline.context";

type Props = {
    processors: ProcessorInstance[];
    setProcessors: React.Dispatch<React.SetStateAction<ProcessorInstance[]>>;
    parameterValues: Record<string, Record<string, string>>;
    setParameterValues: React.Dispatch<React.SetStateAction<Record<string, Record<string, string>>>>;
    className?: string;
};

export function ProcessingPipeline({ processors, setProcessors, parameterValues, setParameterValues, className }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddProcessor = (processor: ProcessorTemplate) => {
        const id = crypto.randomUUID();
        setProcessors([...processors, { ...processor, id }]);

        const defaultValues: Record<string, string> = {};
        processor.parameters.forEach((param) => {
            defaultValues[param.displayName] = param.defaultValue;
        });
        setParameterValues((prev) => ({ ...prev, [id]: defaultValues }));

        setIsModalOpen(false);
    };

    const handleDeleteProcessor = (id?: string) => {
        setProcessors(processors.filter((p) => p.id !== id));
    };

    const handleUpdateParameterValue = (processorId: string, paramName: string, value: string) => {
        setParameterValues((prev) => ({
            ...prev,
            [processorId]: {
                ...prev[processorId],
                [paramName]: value,
            },
        }));
    };

    const handleReorderProcessors = (newProcessors: ProcessorInstance[]) => {
        setProcessors(newProcessors);
    };

    return (
        <PipelineContext
            value={{
                onDeleteProcessor: handleDeleteProcessor,
                onUpdateParameterValue: handleUpdateParameterValue,
                parameterValues: parameterValues,
            }}
        >
            <div className={`card-big ${className ?? ""}`}>
                <ProcessingPipelineHeader onAddClick={() => setIsModalOpen(true)} />
                <div>
                    <ProcessorList className="m-4" processors={processors} onReorder={handleReorderProcessors} />
                    <AddProcessorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddProcessor} />
                </div>
            </div>
        </PipelineContext>
    );
}
