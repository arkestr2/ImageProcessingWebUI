import { useState } from "react";
import type { ProcessorInstance } from "../../models/processor-instance.model";
import { ParameterItem } from "./ParameterItem"
import { usePipelineContext } from "../../contexts/pipeline.context";

type Props = {
    processor: ProcessorInstance
}

export function ProcessorItem({ processor }: Props) {
    const [expanded, setExpanded] = useState(false)
    const { onDeleteProcessor, onUpdateParameterValue, parameterValues } = usePipelineContext()

    return (
        <div className="flex gap-2">
            <div className="w-full bg-surface-secondary rounded mb-2">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full hover:bg-surface-secondary-hover rounded flex items-center gap-2 px-4 py-2"
                >
                    <span className={`transition-transform ${expanded ? 'rotate-90' : ''}`}>
                        ▶
                    </span>
                    <span>{processor.displayName}</span>
                </button>
                {expanded && (
                    <div className="px-8 pb-2">
                        {processor.parameters.map((param) => (
                            <ParameterItem 
                                key={param.displayName}
                                parameter={param}
                                value={ parameterValues[processor.id][param.displayName] }
                                onValueChange={(value) => 
                                    onUpdateParameterValue(processor.id, param.displayName, value)
                                }
                            />                        
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-danger max-h-fit hover:bg-danger-hover rounded mb-2 text-text">
                <button
                className="w-full items-center px-4 py-2"
                onClick={() => onDeleteProcessor(processor.id)}
            >
                Delete
            </button>
            </div>
        </div>
    )
}