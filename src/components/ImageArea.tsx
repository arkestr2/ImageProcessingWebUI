import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage, downloadImage } from "../services/image.service";

type Props = {
    className?: string;
    imageId: string | null;
    onImageUpload: (id: string) => void;
    resultImageId: string | null;
};

export function ImageArea({ className, imageId, onImageUpload, resultImageId }: Props) {
    const [preview, setPreview] = useState<string>();
    const [resultPreview, setResultPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const resultPreviewRef = useRef<string | null>(null);

    useEffect(() => {
        if (!resultImageId) return;

        downloadImage(resultImageId).then((url) => {
            resultPreviewRef.current = url;
            setResultPreview(url);
        });

        return () => {
            if (resultPreviewRef.current) {
                URL.revokeObjectURL(resultPreviewRef.current);
            }
        };
    }, [resultImageId]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length === 0) return;

            const file = acceptedFiles[0];
            if (preview) URL.revokeObjectURL(preview);
            setPreview(URL.createObjectURL(file));

            setIsUploading(true);
            setError(null);

            try {
                const id = await uploadImage(file);
                onImageUpload(id);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Upload failed");
            } finally {
                setIsUploading(false);
            }
        },
    });

    const handleDownload = () => {
        if (!resultPreview) return;
        const link = document.createElement("a");
        link.href = resultPreview;
        link.download = `result-${resultImageId ?? "image"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`flex flex-col gap-4 h-full ${className ?? ""}`}>
            <div className="card-big p-4 bg-grey-700 flex flex-col gap-2">
                <h3 className="flex items-center font-bold">Input Image</h3>
                <div {...getRootProps()} className="card-image cursor-pointer hover:bg-grey-500">
                    <input {...getInputProps()} />
                    {preview ? <img src={preview} alt="Preview" className="object-contain h-full w-full" /> : <p>Drag & drop or click to select an input image</p>}
                </div>
            </div>

            <div className="card-big p-4 bg-grey-700 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold">Output Image</h1>
                    <div>
                        <button className="button-main" onClick={handleDownload}>Download</button>
                    </div>
                </div>
                <div className="card-image">
                    {resultPreview ? (
                        <img src={resultPreview} alt="Processed" className="object-contain h-full w-full" />
                    ) : isUploading ? (
                        <p>Uploading...</p>
                    ) : error ? (
                        <p className="text-danger">{error}</p>
                    ) : imageId ? (
                        <p>Image ready for processing</p>
                    ) : (
                        <p>Output image</p>
                    )}
                </div>
            </div>
        </div>
    );
}
