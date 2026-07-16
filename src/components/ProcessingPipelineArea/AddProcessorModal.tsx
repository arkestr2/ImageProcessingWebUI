import { useState, useEffect } from "react"
import type { Processor } from "../../models/processor.model"
import { getProcessors } from "../../services/processor.service"

type Props = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (processor: Processor) => void
}

export function AddProcessorModal({ isOpen, onClose, onSubmit }: Props) {
    const [availableProcessors, setAvailableProcessors] = useState<Processor[]>([])
    const [selectedProcessor, setSelectedProcessor] = useState<Processor | null>(null)

    useEffect(() => {
        if (!isOpen) return

        getProcessors().then(setAvailableProcessors)
    }, [isOpen])

    const handleSubmit = () => {
        if (selectedProcessor) {
            onSubmit(selectedProcessor)
            setSelectedProcessor(null)
        }
    }

    const handleClose = () => {
        setSelectedProcessor(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-64 lg:w-96 max-h-96 flex flex-col">
                <h2 className="text-lg font-bold mb-4">Add Processor</h2>

                <div className="flex-1 overflow-y-auto mb-4">
                    {availableProcessors.length === 0 ? (
                        <p className="text-gray-500">Loading processors...</p>
                    ) : (
                        <ul className="space-y-2">
                            {availableProcessors.map((processor) => (
                                <li key={processor.displayName}>
                                    <button
                                        onClick={() => setSelectedProcessor(processor)}
                                        className={`w-full text-left px-4 py-2 rounded ${
                                            selectedProcessor?.displayName === processor.displayName
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 hover:bg-gray-200"
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
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedProcessor}
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
