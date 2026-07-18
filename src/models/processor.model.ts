import type { ProcessorParameter } from "./processor.parameter.model"

export type Processor = {
  id?: string
  displayName: string
  type: string
  parameters: ProcessorParameter[]
}
