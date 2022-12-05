import { baseApi as api } from "./base.api";
export const addTagTypes = [
  "health-check",
  "/admin/users/",
  "vacancies",
  "avito",
  "payment",
  "replies",
  "/admin/vacancies/",
  "/admin/hints/",
  "auth",
  "hints",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      healthCheckControllerGetHealthCheck: build.query<
        HealthCheckControllerGetHealthCheckApiResponse,
        HealthCheckControllerGetHealthCheckApiArg
      >({
        query: () => ({ url: `/api/health-check` }),
        providesTags: ["health-check"],
      }),
      adminUsersControllerCreateUser: build.mutation<
        AdminUsersControllerCreateUserApiResponse,
        AdminUsersControllerCreateUserApiArg
      >({
        query: (queryArg) => ({
          url: `/api/admin/users`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["/admin/users/"],
      }),
      adminUsersControllerGetUsers: build.query<
        AdminUsersControllerGetUsersApiResponse,
        AdminUsersControllerGetUsersApiArg
      >({
        query: () => ({ url: `/api/admin/users` }),
        providesTags: ["/admin/users/"],
      }),
      adminUsersControllerGetUser: build.query<
        AdminUsersControllerGetUserApiResponse,
        AdminUsersControllerGetUserApiArg
      >({
        query: (queryArg) => ({ url: `/api/admin/users/${queryArg}` }),
        providesTags: ["/admin/users/"],
      }),
      adminUsersControllerUpdateUser: build.mutation<
        AdminUsersControllerUpdateUserApiResponse,
        AdminUsersControllerUpdateUserApiArg
      >({
        query: (queryArg) => ({
          url: `/api/admin/users/${queryArg.id}`,
          method: "PUT",
          body: queryArg.createUserDto,
        }),
        invalidatesTags: ["/admin/users/"],
      }),
      adminUsersControllerDeleteUser: build.mutation<
        AdminUsersControllerDeleteUserApiResponse,
        AdminUsersControllerDeleteUserApiArg
      >({
        query: (queryArg) => ({
          url: `/api/admin/users/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["/admin/users/"],
      }),
      adminUsersControllerBlockUser: build.mutation<
        AdminUsersControllerBlockUserApiResponse,
        AdminUsersControllerBlockUserApiArg
      >({
        query: (queryArg) => ({
          url: `/api/admin/users/${queryArg}/block`,
          method: "PUT",
        }),
        invalidatesTags: ["/admin/users/"],
      }),
      adminUsersControllerUnblockUser: build.mutation<
        AdminUsersControllerUnblockUserApiResponse,
        AdminUsersControllerUnblockUserApiArg
      >({
        query: (queryArg) => ({
          url: `/api/admin/users/${queryArg}/unblock`,
          method: "PUT",
        }),
        invalidatesTags: ["/admin/users/"],
      }),
      vacanciesControllerAddNewVacancy: build.mutation<
        VacanciesControllerAddNewVacancyApiResponse,
        VacanciesControllerAddNewVacancyApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/draft`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerCreatePendingFromDraft: build.mutation<
        VacanciesControllerCreatePendingFromDraftApiResponse,
        VacanciesControllerCreatePendingFromDraftApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/draft/${queryArg.id}/publish`,
          method: "PUT",
          body: queryArg.createPendingDto,
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerGetSummary: build.query<
        VacanciesControllerGetSummaryApiResponse,
        VacanciesControllerGetSummaryApiArg
      >({
        query: () => ({ url: `/api/vacancies/summary` }),
        providesTags: ["vacancies"],
      }),
      vacanciesControllerCreateTemplate: build.mutation<
        VacanciesControllerCreateTemplateApiResponse,
        VacanciesControllerCreateTemplateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/templates`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerRemoveTemplate: build.mutation<
        VacanciesControllerRemoveTemplateApiResponse,
        VacanciesControllerRemoveTemplateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/templates/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerRemoveVacancyLocal: build.mutation<
        VacanciesControllerRemoveVacancyLocalApiResponse,
        VacanciesControllerRemoveVacancyLocalApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/draft/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerGetVacanciesList: build.query<
        VacanciesControllerGetVacanciesListApiResponse,
        VacanciesControllerGetVacanciesListApiArg
      >({
        query: () => ({ url: `/api/vacancies` }),
        providesTags: ["vacancies"],
      }),
      vacanciesControllerCreatePending: build.mutation<
        VacanciesControllerCreatePendingApiResponse,
        VacanciesControllerCreatePendingApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerGetRecentlyArchived: build.query<
        VacanciesControllerGetRecentlyArchivedApiResponse,
        VacanciesControllerGetRecentlyArchivedApiArg
      >({
        query: () => ({ url: `/api/vacancies/recently-archived` }),
        providesTags: ["vacancies"],
      }),
      vacanciesControllerRemoveArchived: build.mutation<
        VacanciesControllerRemoveArchivedApiResponse,
        VacanciesControllerRemoveArchivedApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/archive/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerGetVacancyFull: build.query<
        VacanciesControllerGetVacancyFullApiResponse,
        VacanciesControllerGetVacancyFullApiArg
      >({
        query: (queryArg) => ({ url: `/api/vacancies/${queryArg}` }),
        providesTags: ["vacancies"],
      }),
      vacanciesControllerUpdateVacancy: build.mutation<
        VacanciesControllerUpdateVacancyApiResponse,
        VacanciesControllerUpdateVacancyApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/${queryArg.id}`,
          method: "PUT",
          body: queryArg.updateVacancyDto,
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerArchiveVacancy: build.mutation<
        VacanciesControllerArchiveVacancyApiResponse,
        VacanciesControllerArchiveVacancyApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["vacancies"],
      }),
      vacanciesControllerGetPublicationInfo: build.query<
        VacanciesControllerGetPublicationInfoApiResponse,
        VacanciesControllerGetPublicationInfoApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/${queryArg.id}/publication-info`,
          params: { forceUpdate: queryArg.forceUpdate },
        }),
        providesTags: ["vacancies"],
      }),
      vacanciesControllerProlongateVacancy: build.mutation<
        VacanciesControllerProlongateVacancyApiResponse,
        VacanciesControllerProlongateVacancyApiArg
      >({
        query: (queryArg) => ({
          url: `/api/vacancies/${queryArg}/prolongate`,
          method: "PUT",
        }),
        invalidatesTags: ["vacancies"],
      }),
      avitoControllerAddEmployee: build.mutation<
        AvitoControllerAddEmployeeApiResponse,
        AvitoControllerAddEmployeeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/avito/employer/${queryArg}`,
          method: "POST",
        }),
        invalidatesTags: ["avito"],
      }),
      avitoControllerGetAvitoAuth: build.query<
        AvitoControllerGetAvitoAuthApiResponse,
        AvitoControllerGetAvitoAuthApiArg
      >({
        query: () => ({ url: `/api/avito/auth` }),
        providesTags: ["avito"],
      }),
      paymentControllerRedirect: build.mutation<
        PaymentControllerRedirectApiResponse,
        PaymentControllerRedirectApiArg
      >({
        query: (queryArg) => ({
          url: `/api/payment/webhook`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["payment"],
      }),
      paymentControllerGetTariffs: build.query<
        PaymentControllerGetTariffsApiResponse,
        PaymentControllerGetTariffsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/payment/position/${queryArg}/tariffs`,
        }),
        providesTags: ["payment"],
      }),
      repliesControllerGetResume: build.query<
        RepliesControllerGetResumeApiResponse,
        RepliesControllerGetResumeApiArg
      >({
        query: (queryArg) => ({ url: `/api/replies/${queryArg}/resume` }),
        providesTags: ["replies"],
      }),
      repliesControllerGetReplyMessages: build.query<
        RepliesControllerGetReplyMessagesApiResponse,
        RepliesControllerGetReplyMessagesApiArg
      >({
        query: (queryArg) => ({ url: `/api/replies/${queryArg}/messages` }),
        providesTags: ["replies"],
      }),
      repliesControllerSendReplyMessage: build.mutation<
        RepliesControllerSendReplyMessageApiResponse,
        RepliesControllerSendReplyMessageApiArg
      >({
        query: (queryArg) => ({
          url: `/api/replies/${queryArg.id}/messages`,
          method: "POST",
          body: queryArg.newMessageDto,
        }),
        invalidatesTags: ["replies"],
      }),
      repliesControllerInviteApplicant: build.mutation<
        RepliesControllerInviteApplicantApiResponse,
        RepliesControllerInviteApplicantApiArg
      >({
        query: (queryArg) => ({
          url: `/api/replies/${queryArg}/invite`,
          method: "PUT",
        }),
        invalidatesTags: ["replies"],
      }),
      repliesControllerRejectReply: build.mutation<
        RepliesControllerRejectReplyApiResponse,
        RepliesControllerRejectReplyApiArg
      >({
        query: (queryArg) => ({
          url: `/api/replies/${queryArg}/reject`,
          method: "PUT",
        }),
        invalidatesTags: ["replies"],
      }),
      adminVacanciesControllerGetVacancies: build.query<
        AdminVacanciesControllerGetVacanciesApiResponse,
        AdminVacanciesControllerGetVacanciesApiArg
      >({
        query: () => ({ url: `/api/admin/vacancies` }),
        providesTags: ["/admin/vacancies/"],
      }),
      adminVacanciesControllerGetVacancy: build.query<
        AdminVacanciesControllerGetVacancyApiResponse,
        AdminVacanciesControllerGetVacancyApiArg
      >({
        query: (queryArg) => ({ url: `/api/admin/vacancies/${queryArg}` }),
        providesTags: ["/admin/vacancies/"],
      }),
      adminVacanciesControllerUpdateVacancy: build.mutation<
        AdminVacanciesControllerUpdateVacancyApiResponse,
        AdminVacanciesControllerUpdateVacancyApiArg
      >({
        query: (queryArg) => ({
          url: `/api/admin/vacancies/${queryArg.id}`,
          method: "PUT",
          body: queryArg.updateVacancyDto,
        }),
        invalidatesTags: ["/admin/vacancies/"],
      }),
      adminHintsControllerGetPositions: build.query<
        AdminHintsControllerGetPositionsApiResponse,
        AdminHintsControllerGetPositionsApiArg
      >({
        query: () => ({ url: `/api/admin/hints/positions` }),
        providesTags: ["/admin/hints/"],
      }),
      adminHintsControllerAddPosition: build.mutation<
        AdminHintsControllerAddPositionApiResponse,
        AdminHintsControllerAddPositionApiArg
      >({
        query: (queryArg) => ({
          url: `/api/admin/hints/positions`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["/admin/hints/"],
      }),
      adminHintsControllerUpdatePosition: build.mutation<
        AdminHintsControllerUpdatePositionApiResponse,
        AdminHintsControllerUpdatePositionApiArg
      >({
        query: (queryArg) => ({
          url: `/api/admin/hints/positions/${queryArg.id}`,
          method: "PUT",
          body: queryArg.adminPositionDto,
        }),
        invalidatesTags: ["/admin/hints/"],
      }),
      adminHintsControllerGetPositionHints: build.query<
        AdminHintsControllerGetPositionHintsApiResponse,
        AdminHintsControllerGetPositionHintsApiArg
      >({
        query: () => ({ url: `/api/admin/hints/positions/hints` }),
        providesTags: ["/admin/hints/"],
      }),
      authControllerSignIn: build.mutation<
        AuthControllerSignInApiResponse,
        AuthControllerSignInApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/users`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["auth"],
      }),
      authControllerLogInIntent: build.mutation<
        AuthControllerLogInIntentApiResponse,
        AuthControllerLogInIntentApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/users/send-otp`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["auth"],
      }),
      authControllerLogIn: build.mutation<
        AuthControllerLogInApiResponse,
        AuthControllerLogInApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/users/login`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["auth"],
      }),
      authControllerLogOut: build.mutation<
        AuthControllerLogOutApiResponse,
        AuthControllerLogOutApiArg
      >({
        query: () => ({ url: `/api/auth/users/login`, method: "DELETE" }),
        invalidatesTags: ["auth"],
      }),
      authControllerRefreshTokens: build.mutation<
        AuthControllerRefreshTokensApiResponse,
        AuthControllerRefreshTokensApiArg
      >({
        query: () => ({
          url: `/api/auth/users/refresh-tokens`,
          method: "POST",
        }),
        invalidatesTags: ["auth"],
      }),
      authControllerCreateChangePhoneIntent: build.mutation<
        AuthControllerCreateChangePhoneIntentApiResponse,
        AuthControllerCreateChangePhoneIntentApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/users/phone-number/change/intent`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["auth"],
      }),
      authControllerUpdatePhoneNumber: build.mutation<
        AuthControllerUpdatePhoneNumberApiResponse,
        AuthControllerUpdatePhoneNumberApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/users/phone-number/change/apply`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["auth"],
      }),
      authControllerGetInfoOfCurrentUser: build.query<
        AuthControllerGetInfoOfCurrentUserApiResponse,
        AuthControllerGetInfoOfCurrentUserApiArg
      >({
        query: () => ({ url: `/api/auth/users/me` }),
        providesTags: ["auth"],
      }),
      authControllerUpdateCurrentUser: build.mutation<
        AuthControllerUpdateCurrentUserApiResponse,
        AuthControllerUpdateCurrentUserApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/users/me`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["auth"],
      }),
      authControllerUpdateExpoToken: build.mutation<
        AuthControllerUpdateExpoTokenApiResponse,
        AuthControllerUpdateExpoTokenApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/expo-token`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["auth"],
      }),
      hintsControllerGetPositionsByName: build.query<
        HintsControllerGetPositionsByNameApiResponse,
        HintsControllerGetPositionsByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/positions/autocomplete/${queryArg}`,
        }),
        providesTags: ["hints"],
      }),
      hintsControllerGetRequirementsByName: build.query<
        HintsControllerGetRequirementsByNameApiResponse,
        HintsControllerGetRequirementsByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/requirements/autocomplete/${queryArg}`,
        }),
        providesTags: ["hints"],
      }),
      hintsControllerGetDutiesByName: build.query<
        HintsControllerGetDutiesByNameApiResponse,
        HintsControllerGetDutiesByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/duties/autocomplete/${queryArg}`,
        }),
        providesTags: ["hints"],
      }),
      hintsControllerGetConditionsByName: build.query<
        HintsControllerGetConditionsByNameApiResponse,
        HintsControllerGetConditionsByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/conditions/autocomplete/${queryArg}`,
        }),
        providesTags: ["hints"],
      }),
      hintsControllerGetWorkPlaces: build.query<
        HintsControllerGetWorkPlacesApiResponse,
        HintsControllerGetWorkPlacesApiArg
      >({
        query: () => ({ url: `/api/hints/work-places` }),
        providesTags: ["hints"],
      }),
      hintsControllerCreateWorkPlace: build.mutation<
        HintsControllerCreateWorkPlaceApiResponse,
        HintsControllerCreateWorkPlaceApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/work-places`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["hints"],
      }),
      hintsControllerGetParameterList: build.query<
        HintsControllerGetParameterListApiResponse,
        HintsControllerGetParameterListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/positions/${queryArg}/parameters`,
        }),
        providesTags: ["hints"],
      }),
      hintsControllerUpdateWorkPlace: build.mutation<
        HintsControllerUpdateWorkPlaceApiResponse,
        HintsControllerUpdateWorkPlaceApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/work-places/${queryArg.id}`,
          method: "PUT",
          body: queryArg.workPlaceDto,
        }),
        invalidatesTags: ["hints"],
      }),
      hintsControllerDeleteWorkPlace: build.mutation<
        HintsControllerDeleteWorkPlaceApiResponse,
        HintsControllerDeleteWorkPlaceApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/work-places/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["hints"],
      }),
      hintsControllerGetSalaryStatistics: build.query<
        HintsControllerGetSalaryStatisticsApiResponse,
        HintsControllerGetSalaryStatisticsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/${queryArg.region}/${queryArg.positionId}/salary-statistics`,
        }),
        providesTags: ["hints"],
      }),
      hintsControllerGetAddressIsValid: build.query<
        HintsControllerGetAddressIsValidApiResponse,
        HintsControllerGetAddressIsValidApiArg
      >({
        query: (queryArg) => ({
          url: `/api/hints/address/${queryArg}/is-valid`,
        }),
        providesTags: ["hints"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type HealthCheckControllerGetHealthCheckApiResponse = unknown;
export type HealthCheckControllerGetHealthCheckApiArg = void;
export type AdminUsersControllerCreateUserApiResponse =
  /** status 200  */ number;
export type AdminUsersControllerCreateUserApiArg = CreateUserDto;
export type AdminUsersControllerGetUsersApiResponse =
  /** status 200  */ UsersDto;
export type AdminUsersControllerGetUsersApiArg = void;
export type AdminUsersControllerGetUserApiResponse =
  /** status 200  */ UserFullDto;
export type AdminUsersControllerGetUserApiArg = number;
export type AdminUsersControllerUpdateUserApiResponse = unknown;
export type AdminUsersControllerUpdateUserApiArg = {
  id: number;
  createUserDto: CreateUserDto;
};
export type AdminUsersControllerDeleteUserApiResponse = unknown;
export type AdminUsersControllerDeleteUserApiArg = number;
export type AdminUsersControllerBlockUserApiResponse = unknown;
export type AdminUsersControllerBlockUserApiArg = number;
export type AdminUsersControllerUnblockUserApiResponse = unknown;
export type AdminUsersControllerUnblockUserApiArg = number;
export type VacanciesControllerAddNewVacancyApiResponse = unknown;
export type VacanciesControllerAddNewVacancyApiArg = CreateVacancyDto;
export type VacanciesControllerCreatePendingFromDraftApiResponse =
  /** status 200  */ string;
export type VacanciesControllerCreatePendingFromDraftApiArg = {
  id: number;
  createPendingDto: CreatePendingDto;
};
export type VacanciesControllerGetSummaryApiResponse =
  /** status 200  */ SummaryDto;
export type VacanciesControllerGetSummaryApiArg = void;
export type VacanciesControllerCreateTemplateApiResponse = unknown;
export type VacanciesControllerCreateTemplateApiArg = CreateVacancyDto;
export type VacanciesControllerRemoveTemplateApiResponse = unknown;
export type VacanciesControllerRemoveTemplateApiArg = number;
export type VacanciesControllerRemoveVacancyLocalApiResponse = unknown;
export type VacanciesControllerRemoveVacancyLocalApiArg = number;
export type VacanciesControllerGetVacanciesListApiResponse =
  /** status 200  */ VacancyShortDto[];
export type VacanciesControllerGetVacanciesListApiArg = void;
export type VacanciesControllerCreatePendingApiResponse =
  /** status 200  */ string;
export type VacanciesControllerCreatePendingApiArg = CreatePendingDto;
export type VacanciesControllerGetRecentlyArchivedApiResponse =
  /** status 200  */ VacancyShortDto[];
export type VacanciesControllerGetRecentlyArchivedApiArg = void;
export type VacanciesControllerRemoveArchivedApiResponse = unknown;
export type VacanciesControllerRemoveArchivedApiArg = number;
export type VacanciesControllerGetVacancyFullApiResponse =
  /** status 200  */ VacancyFullDto;
export type VacanciesControllerGetVacancyFullApiArg = number;
export type VacanciesControllerUpdateVacancyApiResponse =
  /** status 200  */ PlatformRespondedDto;
export type VacanciesControllerUpdateVacancyApiArg = {
  id: number;
  updateVacancyDto: UpdateVacancyDto;
};
export type VacanciesControllerArchiveVacancyApiResponse =
  /** status 200  */ PlatformRespondedDto;
export type VacanciesControllerArchiveVacancyApiArg = number;
export type VacanciesControllerGetPublicationInfoApiResponse =
  /** status 200  */ PublicationInfoDto;
export type VacanciesControllerGetPublicationInfoApiArg = {
  id: number;
  forceUpdate: boolean;
};
export type VacanciesControllerProlongateVacancyApiResponse = unknown;
export type VacanciesControllerProlongateVacancyApiArg = number;
export type AvitoControllerAddEmployeeApiResponse = unknown;
export type AvitoControllerAddEmployeeApiArg = number;
export type AvitoControllerGetAvitoAuthApiResponse = unknown;
export type AvitoControllerGetAvitoAuthApiArg = void;
export type PaymentControllerRedirectApiResponse = unknown;
export type PaymentControllerRedirectApiArg = YooKassaNotificationDto;
export type PaymentControllerGetTariffsApiResponse =
  /** status 200  */ TariffDto[];
export type PaymentControllerGetTariffsApiArg = number;
export type RepliesControllerGetResumeApiResponse =
  /** status 200  */ ResumeDto;
export type RepliesControllerGetResumeApiArg = number;
export type RepliesControllerGetReplyMessagesApiResponse =
  /** status 200  */ MessageDto[];
export type RepliesControllerGetReplyMessagesApiArg = number;
export type RepliesControllerSendReplyMessageApiResponse = unknown;
export type RepliesControllerSendReplyMessageApiArg = {
  id: number;
  newMessageDto: NewMessageDto;
};
export type RepliesControllerInviteApplicantApiResponse = unknown;
export type RepliesControllerInviteApplicantApiArg = number;
export type RepliesControllerRejectReplyApiResponse = unknown;
export type RepliesControllerRejectReplyApiArg = number;
export type AdminVacanciesControllerGetVacanciesApiResponse =
  /** status 200  */ AdminVacancyShortDto[];
export type AdminVacanciesControllerGetVacanciesApiArg = void;
export type AdminVacanciesControllerGetVacancyApiResponse =
  /** status 200  */ AdminVacancyShortDto;
export type AdminVacanciesControllerGetVacancyApiArg = number;
export type AdminVacanciesControllerUpdateVacancyApiResponse =
  /** status 200  */ PlatformRespondedDto;
export type AdminVacanciesControllerUpdateVacancyApiArg = {
  id: number;
  updateVacancyDto: UpdateVacancyDto;
};
export type AdminHintsControllerGetPositionsApiResponse =
  /** status 200  */ AdminPositionDto[];
export type AdminHintsControllerGetPositionsApiArg = void;
export type AdminHintsControllerAddPositionApiResponse =
  /** status 200  */ number;
export type AdminHintsControllerAddPositionApiArg = AdminPositionDto;
export type AdminHintsControllerUpdatePositionApiResponse = unknown;
export type AdminHintsControllerUpdatePositionApiArg = {
  id: number;
  adminPositionDto: AdminPositionDto;
};
export type AdminHintsControllerGetPositionHintsApiResponse =
  /** status 200  */ AdminPositionHintsDto;
export type AdminHintsControllerGetPositionHintsApiArg = void;
export type AuthControllerSignInApiResponse = unknown;
export type AuthControllerSignInApiArg = UserPhoneDto;
export type AuthControllerLogInIntentApiResponse = unknown;
export type AuthControllerLogInIntentApiArg = UserPhoneDto;
export type AuthControllerLogInApiResponse = /** status 200  */ TokensDto;
export type AuthControllerLogInApiArg = LogInInfoDto;
export type AuthControllerLogOutApiResponse = unknown;
export type AuthControllerLogOutApiArg = void;
export type AuthControllerRefreshTokensApiResponse =
  /** status 200  */ TokensDto;
export type AuthControllerRefreshTokensApiArg = void;
export type AuthControllerCreateChangePhoneIntentApiResponse =
  /** status 200  */ UserPhoneDto;
export type AuthControllerCreateChangePhoneIntentApiArg = UserPhoneDto;
export type AuthControllerUpdatePhoneNumberApiResponse =
  /** status 200  */ TokensDto;
export type AuthControllerUpdatePhoneNumberApiArg = LogInInfoDto;
export type AuthControllerGetInfoOfCurrentUserApiResponse =
  /** status 200  */ UserDto;
export type AuthControllerGetInfoOfCurrentUserApiArg = void;
export type AuthControllerUpdateCurrentUserApiResponse = unknown;
export type AuthControllerUpdateCurrentUserApiArg = UpdateUserDto;
export type AuthControllerUpdateExpoTokenApiResponse = unknown;
export type AuthControllerUpdateExpoTokenApiArg = ExpoTokenDto;
export type HintsControllerGetPositionsByNameApiResponse =
  /** status 200  */ ParameterDto[];
export type HintsControllerGetPositionsByNameApiArg = string;
export type HintsControllerGetRequirementsByNameApiResponse =
  /** status 200  */ ParameterDto[];
export type HintsControllerGetRequirementsByNameApiArg = string;
export type HintsControllerGetDutiesByNameApiResponse =
  /** status 200  */ ParameterDto[];
export type HintsControllerGetDutiesByNameApiArg = string;
export type HintsControllerGetConditionsByNameApiResponse =
  /** status 200  */ ParameterDto[];
export type HintsControllerGetConditionsByNameApiArg = string;
export type HintsControllerGetWorkPlacesApiResponse =
  /** status 200  */ WorkPlaceDto[];
export type HintsControllerGetWorkPlacesApiArg = void;
export type HintsControllerCreateWorkPlaceApiResponse = unknown;
export type HintsControllerCreateWorkPlaceApiArg = WorkPlaceDto;
export type HintsControllerGetParameterListApiResponse =
  /** status 200  */ VacancyParametersDto;
export type HintsControllerGetParameterListApiArg = number;
export type HintsControllerUpdateWorkPlaceApiResponse = unknown;
export type HintsControllerUpdateWorkPlaceApiArg = {
  id: number;
  workPlaceDto: WorkPlaceDto;
};
export type HintsControllerDeleteWorkPlaceApiResponse = unknown;
export type HintsControllerDeleteWorkPlaceApiArg = number;
export type HintsControllerGetSalaryStatisticsApiResponse =
  /** status 200  */ HhMarketSalaryDto;
export type HintsControllerGetSalaryStatisticsApiArg = {
  region: string;
  positionId: number;
};
export type HintsControllerGetAddressIsValidApiResponse =
  /** status 200  */ boolean;
export type HintsControllerGetAddressIsValidApiArg = string;
export type CreateUserDto = {
  phoneNumber: string;
  role: "default" | "administrator" | "manager";
  name?: string;
  surname?: string;
  email?: string;
};
export type UserDto = {
  id: number;
  phoneNumber: string;
  role: "default" | "administrator" | "manager";
  vacanciesCount: number;
  name?: string;
  surname?: string;
  email?: string;
  birthDate?: string;
  isBlocked: boolean;
};
export type UsersDto = {
  appUsers: UserDto[];
  adminPanelUsers: UserDto[];
};
export type VacancyShortDto = {
  title: string;
  id: number;
  replies: number;
  views: number;
  datePublish: string;
  dateExpires: string;
  state:
    | "draft"
    | "published"
    | "deleted"
    | "archived"
    | "template"
    | "paymentAwaits"
    | "publishAwaits";
  hhId?: string;
  avitoId?: string;
};
export type UserFullDto = {
  id: number;
  phoneNumber: string;
  role: "default" | "administrator" | "manager";
  vacanciesCount: number;
  name?: string;
  surname?: string;
  email?: string;
  birthDate?: string;
  isBlocked: boolean;
  vacancies: VacancyShortDto[];
};
export type CreateVacancyDto = {
  positionId: number;
  workPlaceId?: number;
  workPlaceTitle?: string;
  workPlaceDescription?: string;
  workPlaceAddress?: string;
  description?: string;
  salaryFrom?: number;
  salaryTil?: number;
  employmentingTypeId?: number;
  scheduleId?: number;
  scheduleCustom?: string;
  workTimeFromHour?: number;
  workTimeFromMin?: number;
  workTimeTilHour?: number;
  workTimeTilMin?: number;
  experienceId?: number;
  conditionsIds?: string[];
  conditionsExtra?: string[];
  dutiesIds?: string[];
  dutiesExtra?: string[];
  requirementsIds?: string[];
  requirementsExtra?: string[];
  companyName?: string;
  showExactAddress?: boolean;
  workTime?: string;
};
export type TariffChosedDto = {
  id: number;
  avitoUpdates: number | null;
  multiplierId: number | null;
};
export type CreatePendingDto = {
  tariff: TariffChosedDto;
  vacancyDto: CreateVacancyDto;
};
export type SummaryDto = {
  repliesCount: number;
  publishedVacanciesCount: number;
  remindersCount: number;
};
export type VacancyFullDto = {
  positionId: number;
  workPlaceId?: number;
  workPlaceTitle?: string;
  workPlaceDescription?: string;
  workPlaceAddress?: string;
  description?: string;
  salaryFrom?: number;
  salaryTil?: number;
  employmentingTypeId?: number;
  scheduleId?: number;
  scheduleCustom?: string;
  workTimeFromHour?: number;
  workTimeFromMin?: number;
  workTimeTilHour?: number;
  workTimeTilMin?: number;
  experienceId?: number;
  conditionsIds?: string[];
  conditionsExtra?: string[];
  dutiesIds?: string[];
  dutiesExtra?: string[];
  requirementsIds?: string[];
  requirementsExtra?: string[];
  companyName?: string;
  showExactAddress?: boolean;
  workTime?: string;
  positionTitle: string;
  id: number;
  state: number;
};
export type PlatformRespondedDto = {
  onHh: boolean;
  onAvito: boolean;
};
export type UpdateVacancyDto = {
  positionId?: number;
  workPlaceId?: number;
  workPlaceTitle?: string;
  workPlaceDescription?: string;
  workPlaceAddress?: string;
  description?: string;
  salaryFrom?: number;
  salaryTil?: number;
  employmentingTypeId?: number;
  scheduleId?: number;
  scheduleCustom?: string;
  workTimeFromHour?: number;
  workTimeFromMin?: number;
  workTimeTilHour?: number;
  workTimeTilMin?: number;
  experienceId?: number;
  conditionsIds?: string[];
  conditionsExtra?: string[];
  dutiesIds?: string[];
  dutiesExtra?: string[];
  requirementsIds?: string[];
  requirementsExtra?: string[];
  companyName?: string;
  showExactAddress?: boolean;
  workTime?: string;
};
export type ReplyShortInfoDto = {
  title: string;
  name: string;
  age: number;
  photoName: string;
  experience: number;
  id: number;
  replyDate: string;
  isFavorite: boolean;
  state: "new" | "rejected" | "invited" | "read";
};
export type RepliesDto = {
  hhReplies: ReplyShortInfoDto[];
  avitoReplies: ReplyShortInfoDto[];
};
export type PublicationInfoDto = {
  viewsCount: number;
  replies: RepliesDto;
  vacancyTitle: string;
};
export type YooKassaNotificationDto = {};
export type TariffHhDto = {
  publication: boolean;
  isStandartPlus: boolean | null;
};
export type TariffAvitoRepliesMultiplierDto = {
  id: number;
  multiplier: number;
  price: number;
};
export type TariffAvitoDto = {
  publication: boolean;
  perUpdatePrice: number | null;
  repliesMultipliers: TariffAvitoRepliesMultiplierDto[] | null;
};
export type TariffDto = {
  id: number;
  type: "optimal" | "econom";
  description: string;
  hh: TariffHhDto;
  avito: TariffAvitoDto;
  basePrice: number;
  isQualified: boolean;
};
export type ResumeExperienceDto = {
  industries: string[];
  position: string;
  company: string;
  start: string;
  end: string;
};
export type ResumeDto = {
  photoUrl: string;
  experience: number;
  title: string;
  name: string;
  age?: number;
  city: string;
  note: string;
  phoneNumber: string;
  industries: string;
  employmentingType: string;
  experiences: ResumeExperienceDto[];
  platform: "hh" | "avito";
};
export type MessageDto = {
  id: number;
  text: string;
  createdAt: string;
  isEmployer: boolean;
};
export type NewMessageDto = {
  text: string;
};
export type AdminVacancyShortDto = {
  title: string;
  id: number;
  replies: number;
  views: number;
  datePublish: string;
  dateExpires: string;
  state:
    | "draft"
    | "published"
    | "deleted"
    | "archived"
    | "template"
    | "paymentAwaits"
    | "publishAwaits";
  hhId?: string;
  avitoId?: string;
  user: UserDto;
};
export type ParameterDto = {
  id: number;
  title: string;
};
export type AdminPositionDto = {
  title: string;
  id: number;
  hhIndustry: ParameterDto;
  avitoIndustry: ParameterDto;
  isQualified: boolean;
  conditions: ParameterDto[];
  duties: ParameterDto[];
  requirements: ParameterDto[];
};
export type AdminPositionHintsDto = {
  hhIndustries: ParameterDto[];
  avitoIndustries: ParameterDto[];
  conditions: ParameterDto[];
  requirements: ParameterDto[];
  duties: ParameterDto[];
};
export type UserPhoneDto = {
  phoneNumber: string;
  autoPasteKey: string;
};
export type TokensDto = {
  accessToken: string;
  refreshToken: string;
};
export type LogInInfoDto = {
  phoneNumber: string;
  autoPasteKey: string;
  otp: string;
};
export type UpdateUserDto = {
  name?: string;
  surname?: string;
  email?: string;
  birthDate?: string;
};
export type ExpoTokenDto = {};
export type WorkPlaceDto = {
  id: number;
  title: string;
  companyName: string;
  address: string;
};
export type RequirementsDto = {
  withExperience: string[];
  withoutExperience: string[];
};
export type VacancyParametersDto = {
  duties: string[];
  requirements: RequirementsDto;
  conditions: string[];
  employmentingTypes: string[];
  experiences: string[];
  schedules: string[];
};
export type HhMarketSalaryDto = {};
export const {
  useHealthCheckControllerGetHealthCheckQuery,
  useAdminUsersControllerCreateUserMutation,
  useAdminUsersControllerGetUsersQuery,
  useAdminUsersControllerGetUserQuery,
  useAdminUsersControllerUpdateUserMutation,
  useAdminUsersControllerDeleteUserMutation,
  useAdminUsersControllerBlockUserMutation,
  useAdminUsersControllerUnblockUserMutation,
  useVacanciesControllerAddNewVacancyMutation,
  useVacanciesControllerCreatePendingFromDraftMutation,
  useVacanciesControllerGetSummaryQuery,
  useVacanciesControllerCreateTemplateMutation,
  useVacanciesControllerRemoveTemplateMutation,
  useVacanciesControllerRemoveVacancyLocalMutation,
  useVacanciesControllerGetVacanciesListQuery,
  useVacanciesControllerCreatePendingMutation,
  useVacanciesControllerGetRecentlyArchivedQuery,
  useVacanciesControllerRemoveArchivedMutation,
  useVacanciesControllerGetVacancyFullQuery,
  useVacanciesControllerUpdateVacancyMutation,
  useVacanciesControllerArchiveVacancyMutation,
  useVacanciesControllerGetPublicationInfoQuery,
  useVacanciesControllerProlongateVacancyMutation,
  useAvitoControllerAddEmployeeMutation,
  useAvitoControllerGetAvitoAuthQuery,
  usePaymentControllerRedirectMutation,
  usePaymentControllerGetTariffsQuery,
  useRepliesControllerGetResumeQuery,
  useRepliesControllerGetReplyMessagesQuery,
  useRepliesControllerSendReplyMessageMutation,
  useRepliesControllerInviteApplicantMutation,
  useRepliesControllerRejectReplyMutation,
  useAdminVacanciesControllerGetVacanciesQuery,
  useAdminVacanciesControllerGetVacancyQuery,
  useAdminVacanciesControllerUpdateVacancyMutation,
  useAdminHintsControllerGetPositionsQuery,
  useAdminHintsControllerAddPositionMutation,
  useAdminHintsControllerUpdatePositionMutation,
  useAdminHintsControllerGetPositionHintsQuery,
  useAuthControllerSignInMutation,
  useAuthControllerLogInIntentMutation,
  useAuthControllerLogInMutation,
  useAuthControllerLogOutMutation,
  useAuthControllerRefreshTokensMutation,
  useAuthControllerCreateChangePhoneIntentMutation,
  useAuthControllerUpdatePhoneNumberMutation,
  useAuthControllerGetInfoOfCurrentUserQuery,
  useAuthControllerUpdateCurrentUserMutation,
  useAuthControllerUpdateExpoTokenMutation,
  useHintsControllerGetPositionsByNameQuery,
  useHintsControllerGetRequirementsByNameQuery,
  useHintsControllerGetDutiesByNameQuery,
  useHintsControllerGetConditionsByNameQuery,
  useHintsControllerGetWorkPlacesQuery,
  useHintsControllerCreateWorkPlaceMutation,
  useHintsControllerGetParameterListQuery,
  useHintsControllerUpdateWorkPlaceMutation,
  useHintsControllerDeleteWorkPlaceMutation,
  useHintsControllerGetSalaryStatisticsQuery,
  useHintsControllerGetAddressIsValidQuery,
} = injectedRtkApi;
