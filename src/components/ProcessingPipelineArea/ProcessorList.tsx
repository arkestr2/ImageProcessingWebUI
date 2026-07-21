import { ProcessorItem } from "./ProcessorItem";
import type { ProcessorInstance } from "../../models/processor-instance.model";

type Props = {
    processors: ProcessorInstance[];
    className?: string;
};

export function ProcessorList({ className, processors }: Props) {
    return (
        <div className={`overflow-y-auto lg:max-h-150 ${className ?? ""}`}>
            {processors.map((p) => (
                <ProcessorItem key={p.id} processor={p} />
            ))}
        </div>
    );
}
