// import 'reflect-metadata'

// import type { CodegenConfig } from '@graphql-codegen/cli'
// import type { ConfigFile } from '@rtk-query/codegen-openapi'
// import type commander from 'commander'

// import type { IGenerator } from '../interfaces/generator.interface.js'

// export class ReactQueryService implements IGenerator {
//   constructor() {}

//   init!: (openapi: boolean, graphql: boolean) => Promise<void>

//   public async generate() {}

//   private async generateOpenapiConfig({
//     apiUrl,
//     openapiPath,
//   }: {
//     openapiPath: string
//     apiUrl: string
//   }) {
//     const defaultOpenapi = await this.getDefaultApiConfig()
//     return {
//       ...defaultOpenapi,
//       apiFile: `${openapiPath}/base.api.ts`,
//       apiImport: 'baseApi',
//       schemaFile: apiUrl,
//     } as ConfigFile
//   }

//   private async generateGqlConfig({
//     gqlPath,
//     gqlSchema,
//     typesPath,
//   }: {
//     gqlPath: string
//     gqlSchema: string
//     typesPath: string
//   }) {
//     const defaultGql = await this.getDefaultGqlConfig()
//     return {
//       ...defaultGql,
//       documents: `${gqlPath}/*.graphql`,
//       schema: gqlSchema,
//       generates: {
//         [typesPath]: {
//           plugins: ['typescript'],
//         },
//         [gqlPath]: {
//           preset: 'near-operation-file',
//           presetConfig: {
//             baseTypesPath: './types.generated.ts',
//           },
//           plugins: [
//             'typescript-operations',
//             {
//               'typescript-rtk-query': {
//                 importBaseApiFrom: '../gql-base.api',
//                 exportHooks: true,
//               },
//             },
//           ],
//         },
//       },
//     } as CodegenConfig
//   }

//   // private async getGqlConfig () {
//   //   try {
//   //     const gqlConfig = fs.readFileSync(this.pathService.getGqlPath, 'utf-8')
//   //     return JSON.parse(gqlConfig) as CodegenConfig
//   //   } catch {
//   //     console.error('ERROR: graphql config file has not founded')
//   //     return null
//   //   }
//   // }

//   private async getDefaultGqlConfig() {
//     return import('../../data/rtq/gql-default.config.js').then((res) => res.default)
//   }

//   private async getDefaultApiConfig() {
//     return import('../../data/rtq/api-default.config.js').then((res) => res.default)
//   }
// }
// eslint-disable-next-line unicorn/no-empty-file
