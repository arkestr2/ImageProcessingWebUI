type Props = {
    className?: string;
};

export function ProcessingPipelineHeader({ className }: Props) {
    return (
        <div className={`bg-gray-800 flex justify-between text-white py-4 ${className ?? ""}`}>
            <h1 className="pl-4 text-white">Processing Pipeline</h1>
            <div className="pr-4">
                <button className="w-8 h-8 rounded-lg bg-gray-600 hover:bg-gray-500 flex items-center justify-center">
                    +
                </button>
            </div>
        </div>
    )
}