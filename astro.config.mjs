import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const owner = repository[0];
const repositoryName = repository[1];
const base = process.env.PUBLIC_BASE_PATH || (repositoryName ? `/${repositoryName}` : '/');
const site = process.env.SITE_URL || (owner && repositoryName ? `https://${owner}.github.io${base}` : undefined);

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always'
});
