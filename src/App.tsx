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
    const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [parameterValues, setParameterValues] = useState<Record<string, Record<string, string>>>({});

    const processorsRef = useRef(processors);
    processorsRef.current = processors;

    const parameterValuesRef = useRef(parameterValues);
    parameterValuesRef.current = parameterValues;

    const onProcess = useCallback(async () => {
        if (!imageId || processorsRef.current.length === 0) return;

        setIsProcessing(true);
        setResultImageUrl(null);

        try {
            const jobId = await submitJob(imageId, processorsRef.current, parameterValuesRef.current);

            pollJobStatus(
                jobId,
                (url) => {
                    setResultImageUrl(url);
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
        <div className="w-screen h-screen flex flex-col items-center bg-bg">
            <Header className="min-h-15 w-full" />
            <div
                className="
                    flex-1
                    grid
                    grid-cols-1
                    grid-rows-[auto_auto_auto]
                    lg:grid-cols-[1fr_2fr]
                    lg:grid-rows-[11fr_1fr]
                    gap-4 py-8
                    px-8
                    lg:px-0
                    w-full
                    max-w-5xl
                    bg-bg
                "
            >
                <ImageArea imageId={imageId} onImageUpload={setImageId} resultImageUrl={resultImageUrl} />
                <ProcessingPipeline
                    processors={processors}
                    setProcessors={setProcessors}
                    parameterValues={parameterValues}
                    setParameterValues={setParameterValues}
                />
                <Footer
                    imageId={imageId}
                    onProcess={onProcess}
                    isProcessing={isProcessing}
                    className="lg:col-span-2 justify-end"
                />
            </div>
        </div>
    );
}
