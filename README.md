# MeshScale TypeScript SDK

The SDK is generated from `../api/openapi.json` with Hey API. After changing the API specification, run `pnpm generate` and commit the generated output with the API change.

## Install

```sh
pnpm add @meshscale/sdk
```

## Use in Next.js

Create a client where the request's access token is available, such as in a Server Component, Route Handler, or Server Action. Each client has isolated configuration, so credentials are not shared between requests.

```ts
import { createMeshScaleClient } from '@meshscale/sdk';

const client = createMeshScaleClient({
  auth: () => accessToken,
});

const result = await client.organizations.list();

if (result.error) {
  throw new Error(result.error.error);
}

const organizations = result.data.organizations;
```

The base URL defaults to `https://api.meshscale.cloud`. Override it for a local or self-hosted API, and use the generated Next.js `next` request options when configuring caching or revalidation:

```ts
const client = createMeshScaleClient({
  baseUrl: process.env.MESHSCALE_API_URL,
  auth: () => accessToken,
  next: { revalidate: 60 },
});
```

The same client exposes `client.organizations.create({ body: { name, slug } })`, `client.organizations.setActive({ body: { organizationId } })`, and `client.user.get()`. Generated calls return typed `{ data, error, response }` results by default; use `throwOnError: true` per request when exceptions are preferred.

List deployments visible to the signed-in user, optionally filtering by project ID or region slug. Provide a deployment ID to return its project and region, versions, domains, and recent metrics:

```ts
const result = await client.deployments.list({
  query: { projectId, region: "syd", limit: 50 },
  throwOnError: true,
});

const response = result.data;
if ("deployments" in response) {
  const nextCursor = response.nextCursor;
} else {
  const deployment = response.deployment;
}
```

The list endpoint uses `nextCursor` for pagination. Detail collections are capped at 100 entries and include `versionsHasMore`, `domainsHasMore`, and `metricsHasMore` indicators. Environment values, arbitrary configuration objects, logs, and container identifiers are not returned.

Do not pass secret API tokens to Client Components. Call the SDK from server-side code or through an authenticated application route.

## Development

```sh
pnpm install
pnpm generate
pnpm typecheck
pnpm build
```