type Props = {
    className?: string;
};

export function Footer({ className }: Props) {
    return (
        <div className={`flex flex-row ${className ?? ""}`}>
            <button className="h-fit w-fit p-4 bg-primary rounded hover:bg-primary-hover text-text">Process</button>
        </div>
    );
}
