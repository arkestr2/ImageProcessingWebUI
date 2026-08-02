type Props = {
    className?: string;
};

export function Header({ className }: Props) {
    return (
        <div className={`bg-grey-700 font-bold flex items-baseline border-container border-x-0 border-t-0 p-4 gap-2 ${className ?? ""}`}>
            <div className="w-16">
                <img src="public/logo.svg" alt="logo" />
            </div>
            <h1 className="text-2xl">Aberration</h1>
        </div>
    );
}
