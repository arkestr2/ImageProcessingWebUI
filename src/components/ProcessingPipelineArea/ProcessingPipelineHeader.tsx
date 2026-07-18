type Props = {
    className?: string;
    onAddClick: () => void;
};

export function ProcessingPipelineHeader({ className, onAddClick }: Props) {
    return (
        <div className={`bg-surface flex justify-between text-text py-4 ${className ?? ""}`}>
            <h1 className="pl-4 text-text font-bold">Processing Pipeline</h1>
            <div className="pr-4">
                <button
                    onClick={onAddClick}
                    className="w-fit h-8 rounded bg-secondary hover:bg-secondary-hover flex items-center justify-center text-surface px-4"
                >
                    Add Processor
                </button>
            </div>
        </div>
    )
}