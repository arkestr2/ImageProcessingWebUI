type Props = {
    className?: string;
    onAddClick: () => void;
};

export function ProcessingPipelineHeader({ className, onAddClick }: Props) {
    return (
        <div className={`flex items-center justify-between pt-4 px-4 ${className ?? ""}`}>
            <h1 className="font-bold">Processing Pipeline</h1>
            <div>
                <button onClick={onAddClick} className="button-main">
                    Add Processor
                </button>
            </div>
        </div>
    );
}
