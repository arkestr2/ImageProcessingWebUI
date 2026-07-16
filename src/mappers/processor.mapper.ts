import type { ProcessorDto } from "../dto/processor.dto"
import type { ProcessorParameterDto } from "../dto/processor.parameter.dto"
import type { Processor } from "../models/processor.model"
import type { ProcessorParameter } from "../models/processor.parameter.model"

export function mapProcessorDtoToModel(dto: ProcessorDto): Processor {
  return {
    displayName: dto.display_name,
    type: dto.type,
    parameters: dto.parameters.map(mapProcessorParametersDtoToModel),
  }
}

function mapProcessorParametersDtoToModel(dto: ProcessorParameterDto): ProcessorParameter {
  return {
      displayName: dto.display_name,
      type: dto.type,
      required: dto.required
  }
}