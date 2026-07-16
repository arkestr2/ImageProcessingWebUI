import { ProcessorItem } from "./ProcessorItem"
import type { Processor } from "../../models/processor.model"

type Props = {
    processors: Processor[],
    className?: string
}

export function ProcessorList({ className, processors }: Props) {
    return (
        <div className={`overflow-y-auto lg:max-h-160 ${className ?? ""}`}>
            {processors.map((p) => (
                <ProcessorItem key={p.displayName} processor={p} />
            ))}
        </div>
    )
}