import type { ProcessorParameterDto } from "./processor-parameter.dto"

export type ProcessorDto = {
  display_name: string
  type: string
  parameters: ProcessorParameterDto[]
}