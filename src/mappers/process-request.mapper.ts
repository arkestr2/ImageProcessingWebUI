import type { ProcessRequestDto } from "../dto/process-request.dto";
import type { ProcessorInstance } from "../models/processor-instance.model";

function coerceParameters(raw: Record<string, string>): Record<string, unknown> {
    return Object.fromEntries(
        Object.entries(raw).map(([k, v]) => {
            const num = Number(v);
            return [k, isNaN(num) ? v : num];
        }),
    );
}

export function mapToProcessRequest(
    imageId: string,
    processors: ProcessorInstance[],
    parameterValues: Record<string, Record<string, string>>,
): ProcessRequestDto {
    return {
        image_id: imageId,
        steps: processors.map((p, i) => ({
            processor_id: p.semanticId,
            order: i + 1,
            parameters: coerceParameters(parameterValues[p.id] ?? {}),
        })),
    };
}
