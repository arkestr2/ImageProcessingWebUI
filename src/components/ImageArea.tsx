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
        <div className={`flex flex-col gap-4 ${className ?? ""}`}>
            <div {...getRootProps()} className="border-2 border-border w-128 h-72 flex items-center justify-center">
                <input {...getInputProps()} />
                {preview ? <img src={preview} alt="Preview" className="object-contain h-full w-full" /> : <p>Drag & drop or click to select an input image</p>}
            </div>

            <div className="relative border-2 border-border w-128 h-72 flex items-center justify-center">
                {resultPreview ? (
                    <>
                        <img src={resultPreview} alt="Processed" className="object-contain h-full w-full" />
                        <button
                            type="button"
                            onClick={handleDownload}
                            className="absolute top-2 right-2 px-3 py-1.5 rounded-md bg-black/60 text-white text-sm
                                       transition-opacity duration-200 cursor-pointer "
                        >
                            Download
                        </button>
                    </>
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
    );
}
