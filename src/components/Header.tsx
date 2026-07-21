type Props = {
    className?: string;
};

export function Header({ className }: Props) {
    return (
        <div className={`bg-surface font-bold flex items-center ${className ?? ""}`}>
            <h1 className="pl-4 text-text">ImageProcessingUI</h1>
        </div>
    );
}
