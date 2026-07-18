import { ProcessorItem } from "./ProcessorItem"
import type { Processor } from "../../models/processor.model"

type Props = {
    processors: Processor[],
    onDeleteClick: (id?: string) => void,
    className?: string
}

export function ProcessorList({ className, processors, onDeleteClick }: Props) {
    return (
        <div className={`overflow-y-auto lg:max-h-150 ${className ?? ""}`}>
            {processors.map((p) => (
                <ProcessorItem key={p.id} processor={p} onDeleteClick={onDeleteClick}/>
            ))}
        </div>
    )
}