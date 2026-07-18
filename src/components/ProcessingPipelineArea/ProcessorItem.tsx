import { useState } from "react";
import type { Processor } from "../../models/processor.model";

type Props = {
    processor: Processor,
    onDeleteClick: (id?: string) => void;
}

export function ProcessorItem({ processor, onDeleteClick }: Props) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="flex gap-2">
            <div className="w-full bg-surface-secondary rounded mb-2">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-surface-secondary-hover"
                >
                    <span className={`transition-transform ${expanded ? 'rotate-90' : ''}`}>
                        ▶
                    </span>
                    <span>{processor.displayName}</span>
                </button>
                {expanded && (
                    <div className="px-8 pb-2">
                        {processor.parameters.map((param) => (
                            <div key={param.displayName} className="flex justify-between text-sm text-text-secondary">
                                <span>{param.displayName}</span>
                                <span>{param.type}</span>
                            </div>                        
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-danger max-h-fit has-[:hover]:bg-danger-hover rounded mb-2 text-text">
                <button
                className="w-full items-center px-4 py-2"
                onClick={() => onDeleteClick(processor.id)}
            >
                Delete
            </button>
            </div>
        </div>
    )
}