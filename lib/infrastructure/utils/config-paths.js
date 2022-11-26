export class DefaultConfigsHelper {
    /**
     * It returns a promise that resolves to a default configuration object for the specified type
     * @param {CgapiType} type - CgapiType - This is the type of codegen you want to use.
     * @returns The default export of the file.
     */
    static async gql(type) {
        switch (type) {
            case 'rtk-query': {
                return import(`${this.dataPath}rtq/gql-default.config.js`).then((res) => res.default);
            }
            case 'react-query': {
                return (await import(`${this.dataPath}rtq/gql-default.config.js`).then((res) => res.default));
            }
            default: {
                return null;
            }
        }
    }
    /**
     * It's a function that returns a promise that resolves to a ConfigFile object
     * @param {CgapiType} type - CgapiType
     * @returns The default export of the file.
     */
    static async openapi(type) {
        switch (type) {
            case 'rtk-query': {
                return (await import(`${this.dataPath}rtq/api-default.config.js`).then((res) => {
                    console.log(`${this.dataPath}rtq/api-default.config.js`);
                    console.log(res);
                    console.log(res.default);
                    return res.default;
                }));
            }
            case 'react-query': {
                return import(`${this.dataPath}rtq/api-default.config.js`).then((res) => res.default);
            }
            default: {
                return null;
            }
        }
    }
}
DefaultConfigsHelper.dataPath = '../../data/';
