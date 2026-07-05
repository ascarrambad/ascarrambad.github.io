import { defineConfig } from "astro/config";

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? "/").split("/");
const isProjectPage = Boolean(
  owner && repository && repository !== `${owner}.github.io`,
);

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : "https://ascarrambad.github.io",
  base: isProjectPage ? `/${repository}` : "/",
  output: "static",
  build: {
    format: "directory",
  },
});
