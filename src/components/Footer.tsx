import type { ProcessorInstance } from "../models/processor-instance.model";

type Props = {
    processors: ProcessorInstance[],
    className?: string;
};

export function Footer({ processors, className }: Props) {
    return (
        <div className={`flex flex-row ${className ?? ""}`}>
            <button className="h-fit w-fit p-4 bg-primary rounded hover:bg-primary-hover text-text">Processes: ${processors.length}</button>
        </div>
    );
}
