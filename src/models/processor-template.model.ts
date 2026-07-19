import type { ProcessorParameter } from "./processor.parameter.model"

export type ProcessorTemplate = {
  displayName: string
  type: string
  parameters: ProcessorParameter[]
}
