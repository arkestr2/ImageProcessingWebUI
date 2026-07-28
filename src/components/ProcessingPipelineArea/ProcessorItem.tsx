import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import type { ProcessorInstance } from "../../models/processor-instance.model";
import { ParameterItem } from "./ParameterItem";
import { usePipelineContext } from "../../contexts/pipeline.context";

type Props = {
    processor: ProcessorInstance;
    index: number;
};

export function ProcessorItem({ processor, index }: Props) {
    const [expanded, setExpanded] = useState(false);
    const { onDeleteProcessor, onUpdateParameterValue, parameterValues } = usePipelineContext();
    const { ref, handleRef, isDragging } = useSortable({
        id: processor.id,
        index,
    });

    return (
        <div ref={ref} data-dragging={isDragging || undefined} className="flex gap-2 mb-2">
            <div
                ref={handleRef}
                className="bg-surface-secondary rounded flex p-2 h-fit cursor-grab text-text-secondary"
            >
                ⋮⋮
            </div>
            <div className="w-full bg-surface-secondary rounded">
                <button onClick={() => setExpanded(!expanded)} className="w-full hover:bg-surface-secondary-hover rounded flex items-center gap-2 px-4 py-2">
                    <span className={`transition-transform ${expanded ? "rotate-90" : ""}`}>▶</span>
                    <span>{processor.displayName}</span>
                </button>
                {expanded && (
                    <div className="px-8 pb-2">
                        {processor.parameters.map((param) => (
                            <ParameterItem
                                key={param.displayName}
                                parameter={param}
                                value={parameterValues[processor.id][param.displayName]}
                                onValueChange={(value) => onUpdateParameterValue(processor.id, param.displayName, value)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-danger h-fit hover:bg-danger-hover rounded text-text">
                <button className="w-full items-center px-4 py-2" onClick={() => onDeleteProcessor(processor.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}
