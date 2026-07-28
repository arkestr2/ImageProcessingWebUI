import { useRef } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { move } from "@dnd-kit/helpers";
import { ProcessorItem } from "./ProcessorItem";
import type { ProcessorInstance } from "../../models/processor-instance.model";

type Props = {
    processors: ProcessorInstance[];
    onReorder: (processors: ProcessorInstance[]) => void;
    className?: string;
};

export function ProcessorList({ processors, onReorder, className }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className={`overflow-y-auto lg:h-150 ${className ?? ""}`}>
            <DragDropProvider
                modifiers={[
                    RestrictToVerticalAxis,
                    RestrictToElement.configure({
                        element: () => containerRef.current,
                    }),
                ]}
                onDragEnd={(event) => {
                    onReorder(move(processors, event));
                }}
            >
                {processors.map((p, i) => (
                    <ProcessorItem key={p.id} processor={p} index={i} />
                ))}
            </DragDropProvider>
        </div>
    );
}
