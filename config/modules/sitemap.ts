export default async function () {
  const { $content } = require("@nuxt/content")
  const projects = await $content("projects").fetch()

  const routes = []
  for (const project of projects) {
    routes.push(`projects/${project.slug}`)
  }

  return {
    hostname: "https://stephen-chen-portfolio.netlify.app",
    gzip: true,
    routes,
  }
}
