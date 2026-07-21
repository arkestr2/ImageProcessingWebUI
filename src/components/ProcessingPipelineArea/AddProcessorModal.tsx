import { useState, useEffect } from "react";
import type { ProcessorTemplate } from "../../models/processor-template.model";
import { getProcessors } from "../../services/processor.service";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (processor: ProcessorTemplate) => void;
};

export function AddProcessorModal({ isOpen, onClose, onSubmit }: Props) {
    const [availableProcessors, setAvailableProcessors] = useState<ProcessorTemplate[]>([]);
    const [selectedProcessor, setSelectedProcessor] = useState<ProcessorTemplate | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        getProcessors().then(setAvailableProcessors);
    }, [isOpen]);

    const handleSubmit = () => {
        if (selectedProcessor) {
            onSubmit(selectedProcessor);
            setSelectedProcessor(null);
        }
    };

    const handleClose = () => {
        setSelectedProcessor(null);
        onClose();
    };

    const handleProcessorSelect = (processor: ProcessorTemplate) => {
        setSelectedProcessor(processor === selectedProcessor ? null : processor);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-bg rounded-lg p-6 w-64 lg:w-96 max-h-96 flex flex-col">
                <h2 className="text-lg font-bold mb-4 text-text-secondary">Add Processor</h2>

                <div className="flex-1 overflow-y-auto mb-2">
                    {availableProcessors.length === 0 ? (
                        <p className="text-text-muted">Loading processors...</p>
                    ) : (
                        <ul className="space-y-2">
                            {availableProcessors.map((processor) => (
                                <li key={processor.displayName}>
                                    <button
                                        onClick={() => handleProcessorSelect(processor)}
                                        className={`w-full text-left px-4 py-2 rounded ${
                                            selectedProcessor?.displayName === processor.displayName
                                                ? "bg-primary text-text "
                                                : "bg-bg hover:bg-surface-secondary text-text-secondary hover:text-text"
                                        }`}
                                    >
                                        {processor.displayName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex gap-2 justify-end">
                    <button onClick={handleClose} className="px-4 py-2 rounded border-2 border-danger hover:bg-secondary-hover text-text=secondary">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedProcessor}
                        className="px-4 py-2 rounded bg-primary text-text hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
