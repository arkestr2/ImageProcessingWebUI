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
                className="card-small max-h-14 flex p-2 cursor-grab text-text-muted items-center"
            >
                ⋮⋮
            </div>
            <div className="w-full card-small">
                <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center rounded-lg hover:bg-grey-500 gap-2 px-4 py-2 cursor-pointer justify-between">
                    <div className="flex items-center">
                        <div className={`transition-transform mr-2 ${expanded ? "rotate-90" : ""}`}>▶</div>
                        <div>{processor.displayName}</div>
                    </div>
                    <button className="button-danger" onClick={() => onDeleteProcessor(processor.id)}>
                        Delete
                    </button>
                </button>
                {expanded && (
                    <div className="pl-8 pr-4 py-2">
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
        </div>
    );
}
