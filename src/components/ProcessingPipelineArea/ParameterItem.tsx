import type { ProcessorParameter } from "../../models/processor-parameter.model";

type Props = {
    parameter: ProcessorParameter;
    value: string;
    onValueChange: (value: string) => void;
};

function getInputType(paramType: string): string {
    switch (paramType) {
        case "int":
        case "float":
            return "number";
        default:
            return "text";
    }
}

export function ParameterItem({ parameter, value, onValueChange }: Props) {
    return (
        <div className="flex justify-between items-center text-sm py-1">
            <span className="text-text-secondary">{parameter.displayName}</span>
            <input
                type={getInputType(parameter.type)}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className="w-24 px-2 py-1 rounded bg-bg border border-border text-text-secondary"
            />
        </div>
    );
}
