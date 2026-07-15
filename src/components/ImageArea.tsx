type Props = {
    className?: string;
};

export function ImageArea({ className }: Props) {
    return (
        <div className={`flex flex-col gap-4 ${className ?? ""}`}>
            <div className="w-full aspect-video bg-gray-400 flex items-center justify-center">
                <p>Drag & drop the input image</p>
            </div>
            <div className="w-full aspect-video bg-gray-400"/>
        </div>
    );
}
