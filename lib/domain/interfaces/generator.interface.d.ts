export interface IGenerator {
    generate: (openapi: boolean, graphql: boolean) => Promise<void>;
    init: (openapi: boolean, graphql: boolean) => Promise<void>;
}
