import type { CgapiConfigType } from '../../infrastructure/types/cgapi.types.js'

export interface IPromptService {
  selectType(): Promise<CgapiConfigType['type']>
  selectPostmanUrl(): Promise<string>
  selectOpenapiUrl(): Promise<string>
  selectGqlUrl(): Promise<string | undefined>
  selectApiPath(): Promise<string | undefined>
  selectGqlPath(): Promise<string | undefined>
  selectConfigPath(): Promise<string | undefined>
}
