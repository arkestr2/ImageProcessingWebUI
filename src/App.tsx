import { useCallback, useRef, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ImageArea } from "./components/ImageArea";
import { ProcessingPipeline } from "./components/ProcessingPipelineArea/ProcessingPipeline";
import type { ProcessorInstance } from "./models/processor-instance.model";
import { submitJob, pollJobStatus } from "./services/process.service";

export function App() {
    const [processors, setProcessors] = useState<ProcessorInstance[]>([]);
    const [imageId, setImageId] = useState<string | null>(null);
    const [resultImageId, setResultImageId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [parameterValues, setParameterValues] = useState<Record<string, Record<string, string>>>({});

    const processorsRef = useRef(processors);
    processorsRef.current = processors;

    const parameterValuesRef = useRef(parameterValues);
    parameterValuesRef.current = parameterValues;

    const onProcess = useCallback(async () => {
        if (!imageId || processorsRef.current.length === 0) return;

        setIsProcessing(true);
        setResultImageId(null);

        try {
            const jobId = await submitJob(imageId, processorsRef.current, parameterValuesRef.current);

            pollJobStatus(
                jobId,
                (id) => {
                    setResultImageId(id);
                    setIsProcessing(false);
                },
                (err) => {
                    alert(err.message);
                    setIsProcessing(false);
                },
            );
        } catch (e) {
            alert(e instanceof Error ? e.message : "Failed to submit job");
            setIsProcessing(false);
        }
    }, [imageId]);

    return (
        <div className="w-full h-screen flex flex-col items-center bg-grey-800">
            <Header className="h-15 w-full" />
            <div
                className="
                    m-8
                    flex-1
                    h-full
                    grid
                    grid-cols-[1fr_1fr]
                    grid-rows-[auto_1fr]
                    gap-4
                "
            >
                <ImageArea imageId={imageId} onImageUpload={setImageId} resultImageId={resultImageId} />
                <ProcessingPipeline
                    processors={processors}
                    setProcessors={setProcessors}
                    parameterValues={parameterValues}
                    setParameterValues={setParameterValues}
                    className="h-full"
                />
                <Footer
                    processors={processors}
                    imageId={imageId}
                    onProcess={onProcess}
                    isProcessing={isProcessing}
                    className="col-span-2 justify-end"
                />
            </div>
        </div>
    );
}
