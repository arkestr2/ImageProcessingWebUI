import { useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
    className?: string;
};

export function ImageArea({ className }: Props) {
    const [preview, setPreview] = useState<string>();

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const url = URL.createObjectURL(acceptedFiles[0]);

            setPreview(url);
            console.log(acceptedFiles);
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
            <div className="w-full aspect-video bg-surface-secondary hover:bg-surface-secondary-hover" />
        </div>
    );
}
