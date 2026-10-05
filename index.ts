import {
  createClient as createTransportClient,
  type TDataShape,
} from './generated/client';
import {
  createBuild,
  createDeployment,
  createOrganization,
  createProject,
  deleteDeployment,
  deleteProject,
  getDeployment,
  getHealth,
  getProject,
  getProjectSettings,
  getTeamSettings,
  getUser,
  getUserPreferences,
  listDeployments,
  listBuilds,
  listOrganizations,
  listProjects,
  listRegions,
  setActiveOrganization,
  updateDeployment,
  updateProject,
  updateProjectSettings,
  updateTeamSettings,
  updateUserPreferences,
  type Options as OperationOptions,
} from './generated/sdk.gen';
import type {
  CreateBuildData,
  CreateDeploymentData,
  CreateOrganizationData,
  CreateProjectData,
  DeleteDeploymentData,
  DeleteProjectData,
  GetHealthData,
  GetDeploymentData,
  GetProjectData,
  GetProjectSettingsData,
  GetTeamSettingsData,
  GetUserData,
  GetUserPreferencesData,
  ListBuildsData,
  ListDeploymentsData,
  ListOrganizationsData,
  ListProjectsData,
  ListRegionsData,
  SetActiveOrganizationData,
  UpdateDeploymentData,
  UpdateProjectData,
  UpdateProjectSettingsData,
  UpdateTeamSettingsData,
  UpdateUserPreferencesData,
} from './generated/types.gen';

const DEFAULT_BASE_URL = 'https://api.meshscale.cloud';

export const ORGANIZATION_HEADER = 'X-MeshScale-Organization';

type OptionsWithoutClient<
  TData extends TDataShape,
  ThrowOnError extends boolean,
> = Omit<OperationOptions<TData, ThrowOnError>, 'client'>;

export type MeshScaleClientOptions = NonNullable<Parameters<typeof createTransportClient>[0]> & {
  organizationId?: string | null;
};

export function createMeshScaleClient({
  organizationId: initialOrganizationId = null,
  ...options
}: MeshScaleClientOptions = {}) {
  const transport = createTransportClient({
    baseUrl: DEFAULT_BASE_URL,
    ...options,
  });

  let organizationId = initialOrganizationId;

  // An explicit per-request header takes precedence over the client-wide scope.
  transport.interceptors.request.use((request) => {
    if (organizationId && !request.headers.has(ORGANIZATION_HEADER)) {
      request.headers.set(ORGANIZATION_HEADER, organizationId);
    }
  });

  return {
    getOrganization: () => organizationId,
    setOrganization: (id: string | null) => {
      organizationId = id;
    },
    health: {
      get: <ThrowOnError extends boolean = false>(
        requestOptions?: OptionsWithoutClient<GetHealthData, ThrowOnError>,
      ) => getHealth<ThrowOnError>({ ...requestOptions, client: transport }),
    },
    deployments: {
      list: <ThrowOnError extends boolean = false>(
        requestOptions?: OptionsWithoutClient<ListDeploymentsData, ThrowOnError>,
      ) => listDeployments<ThrowOnError>({ ...requestOptions, client: transport }),
      create: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<CreateDeploymentData, ThrowOnError>,
      ) => createDeployment<ThrowOnError>({ ...requestOptions, client: transport }),
      get: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<GetDeploymentData, ThrowOnError>,
      ) => getDeployment<ThrowOnError>({ ...requestOptions, client: transport }),
      update: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<UpdateDeploymentData, ThrowOnError>,
      ) => updateDeployment<ThrowOnError>({ ...requestOptions, client: transport }),
      delete: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<DeleteDeploymentData, ThrowOnError>,
      ) => deleteDeployment<ThrowOnError>({ ...requestOptions, client: transport }),
    },
    builds: {
      list: <ThrowOnError extends boolean = false>(
        requestOptions?: OptionsWithoutClient<ListBuildsData, ThrowOnError>,
      ) => listBuilds<ThrowOnError>({ ...requestOptions, client: transport }),
      create: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<CreateBuildData, ThrowOnError>,
      ) => createBuild<ThrowOnError>({ ...requestOptions, client: transport }),
    },
    organizations: {
      list: <ThrowOnError extends boolean = false>(
        requestOptions?: OptionsWithoutClient<ListOrganizationsData, ThrowOnError>,
      ) => listOrganizations<ThrowOnError>({ ...requestOptions, client: transport }),
      create: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<CreateOrganizationData, ThrowOnError>,
      ) => createOrganization<ThrowOnError>({ ...requestOptions, client: transport }),
      setActive: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<SetActiveOrganizationData, ThrowOnError>,
      ) => setActiveOrganization<ThrowOnError>({ ...requestOptions, client: transport }),
      settings: {
        get: <ThrowOnError extends boolean = false>(
          requestOptions?: OptionsWithoutClient<GetTeamSettingsData, ThrowOnError>,
        ) => getTeamSettings<ThrowOnError>({ ...requestOptions, client: transport }),
        update: <ThrowOnError extends boolean = false>(
          requestOptions: OptionsWithoutClient<UpdateTeamSettingsData, ThrowOnError>,
        ) => updateTeamSettings<ThrowOnError>({ ...requestOptions, client: transport }),
      },
    },
    projects: {
      list: <ThrowOnError extends boolean = false>(
        requestOptions?: OptionsWithoutClient<ListProjectsData, ThrowOnError>,
      ) => listProjects<ThrowOnError>({ ...requestOptions, client: transport }),
      create: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<CreateProjectData, ThrowOnError>,
      ) => createProject<ThrowOnError>({ ...requestOptions, client: transport }),
      get: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<GetProjectData, ThrowOnError>,
      ) => getProject<ThrowOnError>({ ...requestOptions, client: transport }),
      update: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<UpdateProjectData, ThrowOnError>,
      ) => updateProject<ThrowOnError>({ ...requestOptions, client: transport }),
      delete: <ThrowOnError extends boolean = false>(
        requestOptions: OptionsWithoutClient<DeleteProjectData, ThrowOnError>,
      ) => deleteProject<ThrowOnError>({ ...requestOptions, client: transport }),
      settings: {
        get: <ThrowOnError extends boolean = false>(
          requestOptions: OptionsWithoutClient<GetProjectSettingsData, ThrowOnError>,
        ) => getProjectSettings<ThrowOnError>({ ...requestOptions, client: transport }),
        update: <ThrowOnError extends boolean = false>(
          requestOptions: OptionsWithoutClient<UpdateProjectSettingsData, ThrowOnError>,
        ) => updateProjectSettings<ThrowOnError>({ ...requestOptions, client: transport }),
      },
    },
    regions: {
      list: <ThrowOnError extends boolean = false>(
        requestOptions?: OptionsWithoutClient<ListRegionsData, ThrowOnError>,
      ) => listRegions<ThrowOnError>({ ...requestOptions, client: transport }),
    },
    user: {
      get: <ThrowOnError extends boolean = false>(
        requestOptions?: OptionsWithoutClient<GetUserData, ThrowOnError>,
      ) => getUser<ThrowOnError>({ ...requestOptions, client: transport }),
      preferences: {
        get: <ThrowOnError extends boolean = false>(
          requestOptions?: OptionsWithoutClient<GetUserPreferencesData, ThrowOnError>,
        ) => getUserPreferences<ThrowOnError>({ ...requestOptions, client: transport }),
        update: <ThrowOnError extends boolean = false>(
          requestOptions: OptionsWithoutClient<UpdateUserPreferencesData, ThrowOnError>,
        ) => updateUserPreferences<ThrowOnError>({ ...requestOptions, client: transport }),
      },
    },
  };
}

export type * from './generated/types.gen';