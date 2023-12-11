const Feed = () => {
  const baseUrlProjects = "https://stephen-chen-portfolio.netlify.app/projects"

  const feedFormats = {
    rss: { type: "rss2", file: "rss.xml" },
    json: { type: "json1", file: "feed.json" },
  }

  const { $content } = require("@nuxt/content")

  const createFeedArticles = async function (feed: any) {
    feed.options = {
      title: "Stephen Chen's Portfolio",
      description:
        "Stephen Chen's Portfolio",
      link: baseUrlProjects,
    }

    const projects = await $content("projects").fetch()

    projects.forEach((project: any) => {
      const url = `${baseUrlProjects}/${project.slug}`

      const hostName =
        process.env.NODE_ENV === "production"
          ? "https://stephen-chen-portfolio.netlify.app"
          : "http://localhost:3000"

      const postImagesPath = `${hostName}/assets/images/posts`

      feed.addItem({
        title: project.title,
        slug: project.slug,
        link: url,
        image: project.image
          ? `${hostName}${project.image}`
          : `${postImagesPath}/${url?.split("/")?.at(-1)}.jpg`,
        date: new Date(project.createdAt),
        description: project.description,
        content: project.summary,
      })
    })
  }

  return Object.values(feedFormats).map(({ file, type }) => ({
    path: `${file}`,
    create: createFeedArticles,
    type,
  }))
}

export default Feed
