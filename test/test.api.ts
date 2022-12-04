import { baseApi as api } from "test/base.api";
export const addTagTypes = [] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({}),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export const {} = injectedRtkApi;
