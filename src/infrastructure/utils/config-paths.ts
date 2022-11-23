import type { CodegenConfig } from '@graphql-codegen/cli'
import type { ConfigFile } from '@rtk-query/codegen-openapi'

import type { CgapiType } from '../types/cgapi.types.js'

export class DefaultConfigsHelper {
  private static dataPath = '../../data/'

  /**
   * It returns a promise that resolves to a default configuration object for the specified type
   * @param {CgapiType} type - CgapiType - This is the type of codegen you want to use.
   * @returns The default export of the file.
   */
  public static async gql(type: CgapiType) {
    switch (type) {
      case 'rtk-query': {
        return import(`${this.dataPath}rtq/gql-default.config.js`).then(
          (res) => res.default
        )
      }
      case 'react-query': {
        return (await import(`${this.dataPath}rtq/gql-default.config.js`).then(
          (res) => res.default
        )) as CodegenConfig
      }
      default: {
        return null
      }
    }
  }

  /**
   * It's a function that returns a promise that resolves to a ConfigFile object
   * @param {CgapiType} type - CgapiType
   * @returns The default export of the file.
   */
  public static async openapi(type: CgapiType) {
    switch (type) {
      case 'rtk-query': {
        return (await import(`${this.dataPath}rtq/api-default.config.js`).then(
          (res) => res.default
        )) as ConfigFile
      }
      case 'react-query': {
        return import(`${this.dataPath}rtq/api-default.config.js`).then(
          (res) => res.default
        )
      }
      default: {
        return null
      }
    }
  }
}
