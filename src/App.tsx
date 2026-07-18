import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ImageArea } from "./components/ImageArea";
import { ProcessingPipeline } from "./components/ProcessingPipelineArea/ProcessingPipeline";

export function App() {
    return (
        <>
            <div className="w-screen h-screen flex flex-col items-center bg-bg">
                <Header className="min-h-15 w-full"/>
                <div className="
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
                    <ImageArea/>
                    <ProcessingPipeline></ProcessingPipeline>
                    <Footer className="lg:col-span-2 justify-end"/>
                </div>
            </div>
        </>
    );
}
