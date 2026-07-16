import { apiClient } from "../api/client"
import type { Processor } from "../models/processor.model"
import { mapProcessorDtoToModel } from "../mappers/processor.mapper"
import type { ProcessorDto } from "../dto/processor.dto"

export async function getProcessors(): Promise<Processor[]> {
    const dtos = await apiClient.get<ProcessorDto[]>("/processors")
    return dtos.map(mapProcessorDtoToModel)
}   