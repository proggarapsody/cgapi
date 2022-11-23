import type { CodegenConfig } from '@graphql-codegen/cli'

const config = {
  schema: '',
  documents: '',
  config: {
    namingConvention: {
      typeNames: 'change-case-all#pascalCase',
      enumValues: 'change-case-all#upperCase',
      transformUnderscore: true,
    },
  },
  generates: {},
} as CodegenConfig

export default config
