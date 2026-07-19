import { apiClient } from "../api/client"
import type { ProcessorTemplate } from "../models/processor-template.model"
import { mapProcessorDtoToModel } from "../mappers/processor.mapper"
import type { ProcessorDto } from "../dto/processor.dto"

export async function getProcessors(): Promise<ProcessorTemplate[]> {
    const dtos = await apiClient.get<ProcessorDto[]>("/processors")
    return dtos.map(mapProcessorDtoToModel)
}   