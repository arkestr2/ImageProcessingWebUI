import type { ProcessorInstance } from "../models/processor-instance.model";

type Props = {
    processors: ProcessorInstance[];
    imageId: string | null;
    onProcess: () => Promise<void>;
    isProcessing: boolean;
    className?: string;
};

export function Footer({ processors, imageId, onProcess, isProcessing, className }: Props) {
    const disabled = !imageId || isProcessing || !processors.length;

    return (
        <div className={`flex flex-row ${className ?? ""}`}>
            <button
                onClick={onProcess}
                disabled={disabled}
                className="button-main disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
                {isProcessing ? "Processing..." : "Process"}
            </button>
        </div>
    );
}
