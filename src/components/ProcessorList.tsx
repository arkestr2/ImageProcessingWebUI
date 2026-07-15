import { ProcessorItem } from "./ProcessorItem"

type Props = {
    processors: Processor[],
    className?: string
}

export type Processor = {
    name: string
    parameters: Parameter[]
}

export type Parameter = {
    name: string
    value: string
}

export function ProcessorList({ className, processors }: Props) {
    return (
        <div className={`bg-amber-700 p-8 pb-16 ${className ?? ""}`}>
                <div className="overflow-y-auto lg:max-h-150">
                    {processors.map((p) => (
                        <ProcessorItem key={p.name} processor={p} />
                    ))}
                </div>
        </div>
    )
}