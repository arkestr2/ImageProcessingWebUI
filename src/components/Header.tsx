type Props = {
    className?: string;
};

export function Header({ className }: Props) {
    return (
        <div className={`bg-grey-700 font-bold flex items-center border-container border-x-0 border-t-0 p-4 ${className ?? ""}`}>
            <h1>ImageProcessingUI</h1>
        </div>
    );
}
