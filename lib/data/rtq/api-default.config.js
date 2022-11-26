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
};
export default config;
