import { useState } from "react";
import type { Processor } from "../../models/processor.model";


export function ProcessorItem({ processor }: { processor: Processor }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="bg-amber-200">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
                <span className={`transition-transform ${expanded ? 'rotate-90' : ''}`}>
                    ▶
                </span>
                <span>{processor.displayName}</span>


            </button>
            {expanded && (
                <div className="px-8 pb-2">
                    {processor.parameters.map((param) => (
                        <div key={param.displayName} className="flex justify-between text-sm text-gray-900">
                            <span>{param.displayName}</span>
                            <span>{param.type}</span>
                        </div>                        
                    ))}
                </div>
            )}
        </div>
    )
}