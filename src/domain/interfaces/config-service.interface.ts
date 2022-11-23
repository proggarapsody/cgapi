import type { CgapiConfigType } from '../../infrastructure/types/cgapi.types.js'

export interface IConfigService {
  generateMainConfig(isPostman: boolean): Promise<void>
  getMainConfig(): CgapiConfigType | null
  setMainConfig(mainConfig: CgapiConfigType): void
}
