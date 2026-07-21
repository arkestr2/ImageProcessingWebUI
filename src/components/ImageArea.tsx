import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../services/image.service";

type Props = {
    className?: string;
    imageId: string | null;
    onImageUpload: (id: string) => void;
};

export function ImageArea({ className, imageId, onImageUpload }: Props) {
    const [preview, setPreview] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className={`flex flex-col gap-4 ${className ?? ""}`}>
            <div className="w-full aspect-video bg-surface-secondary hover:bg-surface-secondary-hover flex items-center justify-center">
                <div {...getRootProps()} className="h-full w-full flex items-center justify-center">
                    <input {...getInputProps()} />
                    {preview ? (
                        <img src={preview} alt="Preview" />
                    ) : (
                        <p>Drag & drop or click to select an input image</p>
                    )}
                </div>
            </div>
            <div className="w-full aspect-video bg-surface-secondary flex items-center justify-center">
                {isUploading ? (
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
