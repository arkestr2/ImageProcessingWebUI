type Props = {
    className?: string;
};

export function Footer({ className }: Props) {
    return (
        <div className={`flex flex-row ${className ?? ""}`}>
            <button className="bg-blue-200 p-4">Process</button>
        </div>
    );
}
