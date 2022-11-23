export type CgapiType = 'rtk-query' | 'react-query'

export type CgapiConfigType = {
  configPath: string
  postmanCollectionUrl: string | undefined
  isPostman: boolean
  type: CgapiType
}
