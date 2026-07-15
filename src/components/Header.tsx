type Props = {
    className?: string;
};

export function Header({ className }: Props) {
    return (
        <div className={`bg-gray-800 flex items-center ${className ?? ""}`}>
            <h1 className="pl-4 text-white">ImageProcessingUI</h1>
        </div>
    )
}