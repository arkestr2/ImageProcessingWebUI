type Props = {
    imageId: string | null;
    onProcess: () => Promise<void>;
    isProcessing: boolean;
    className?: string;
};

export function Footer({ imageId, onProcess, isProcessing, className }: Props) {
    const disabled = !imageId || isProcessing;

    return (
        <div className={`flex flex-row ${className ?? ""}`}>
            <button
                onClick={onProcess}
                disabled={disabled}
                className="h-fit w-fit p-4 bg-primary rounded hover:bg-primary-hover text-text disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? "Processing..." : "Process"}
            </button>
        </div>
    );
}
