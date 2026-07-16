import type { ProcessorParameter } from "./processor.parameter.model"

export type Processor = {
  displayName: string
  type: string
  parameters: ProcessorParameter[]
}
