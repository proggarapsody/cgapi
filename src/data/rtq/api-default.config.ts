import type openapi from '@rtk-query/codegen-openapi'

const config = {
  apiFile: '',
  apiImport: '',
  schemaFile: '',
  flattenArg: true,

  /**
   * @example
   * './controllers/auth.api.ts': {
   * filterEndpoints: [/authController/]
   * }
   */
  outputFiles: {},
  hooks: true,
  tag: true,
} as openapi.ConfigFile

export default config
