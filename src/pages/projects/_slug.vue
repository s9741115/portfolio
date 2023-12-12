<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { Project } from "~/src/types/Post"

interface RelatedPost {
  title: string
  slug: string
}

export default Vue.extend({
  data() {
    return {
      project: {} as Project,
      related: [] as RelatedPost[],
    }
  },
  async fetch() {
    const project = (await this.$content(
      "projects",
      this.$route.params.slug
    ).fetch()) as Project

    if (!project) {
      this.$router.push("/projects")
      return
    }

    this.project = project

    if (project.related?.length) {
      const array = []

      for (const key of project.related) {
        const { title }: any = await this.$content("projects", key)
          .only(["title"])
          .fetch()

        array.push({
          title,
          slug: key,
        })
      }

      this.related = array
    }
  },
  head() {
    const project = this.project
    const { getTags } = this as {
      getTags: string[]
    }

    const title = project.title
    const description =
      project.description || ""

    const tags = getTags?.join(", ") || title
    const href = `https://eggsy.xyz${this.$route?.path}`
    const image = `/og-images/${project.slug}.png`

    return {
      bodyAttrs: {
        class: "overflow-x-hidden",
      },
      title,
      link: [
        {
          rel: "canonical",
          href,
        },
      ],
      meta: this.$prepareMeta(
        {
          title,
          description,
          image,
          keywords: `${tags}, stephen chen's project, project`,
          url: href,
        },
        [
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "article:published-time",
            content: project?.createdAt || null,
          },
          {
            name: "twitter:label1",
            content: "Tarih",
          },
          {
            name: "twitter:data1",
            content: project?.createdAt,
          },
          {
            name: "twitter:label2",
            content: "Okuma Süresi",
          },
          {
            name: "twitter:data2",
            content: `${this.getReadingTime} dakika`,
          },
        ]
      ),
    }
  },
  watch: {
    $fetchState: {
      async handler(state) {
        if (state.pending === true || state.error !== null) return
        await this.$nextTick()
        this.$applyMediumZoom()
      },
      deep: true,
    },
  },
  computed: {
    getTags(): string[] {
      return this.project?.tags || []
    },
    getReadingTime() {
      return this.$getReadingTime(JSON.stringify(this.project.body))
    },
    getReadableDate() {
      return this.$getReadableDate(new Date(this.project?.createdAt || Date.now()))
    },
    getRelatedPosts(): RelatedPost[] {
      return this.related || []
    },
  },
})
</script>

<template>
  <Transition name="fade">
    <LoadersContent
      v-if="$fetchState.pending === true || $fetchState.error !== null"
      :error="$fetchState.pending === false && $fetchState.error !== null"
    />

    <div v-else class="pt-4 mt-10">
      <article>
        <header class="space-y-8 leading-relaxed text-center mb-18">
          <img
            v-if="project.header"
            :src="project.header"
            class="object-cover object-top w-full transition-all rounded-lg h-30 ring-1 dark:ring-white/10 ring-black/10 hover:h-90 hover:object-center duration-1000"
            alt="Post header"
          />

          <div class="space-y-4">
            <div
              class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 dark:text-white/30 text-black/50 sm:text-sm"
            >
              <div class="flex items-center space-x-2">
                <IconCalendar class="w-4 h-4" />
                <span>{{ getReadableDate }}</span>
              </div>

              <div class="flex items-center space-x-2">
                <IconTag class="w-4 h-4" />
                <span>{{ getTags.join(" － ") }}</span>
              </div>
            </div>

            <div class="space-y-2">
              <h1
                class="block mx-auto text-2xl font-bold text-black md:w-11/12 sm:text-4xl dark:text-white"
              >
                {{ project.title }}
              </h1>

              <p class="mx-auto text-black/50 md:w-9/12 dark:text-white/50">
                {{ project.description }}
              </p>
            </div>
          </div>
        </header>

        <div class="mt-4">
          <template v-if="!project.indicatorsHidden">
            <div
              class="sticky z-10 hidden float-left -ml-20 text-right top-4 md:block"
            >
              <BlogShare
                type="vertical"
                :title="project.title"
                :path="$route.path"
              />
            </div>

            <div
              class="sticky z-10 hidden float-right text-left -mr-14 top-4 md:block"
            >
              <BlogReadingIndicator selector=".nuxt-content" />
            </div>
          </template>

          <BlogTableOfContents :toc="project.toc" />

          <NuxtContent
            :document="project"
            class="max-w-full prose prose-black dark:prose-light"
          />
        </div>
      </article>

      <Disqus
        v-if="!$config.isDev"
        :title="project.title"
        :url="`https://stephen-chen-portfolio.netlify.app/projects/${project.slug}`"
        :identifier="`/projects/${project.slug}`"
        :slug="project.slug"
        lang="tr"
        class="mt-10"
      />

      <div class="mt-16 space-y-10">
        <div v-if="getRelatedPosts.length > 0" class="space-y-2">
          <h3 class="text-sm dark:text-white/30 text-black/50">
            Benzer Gönderiler
          </h3>

          <div v-if="getRelatedPosts.length" class="grid gap-4 sm:grid-cols-2">
            <NuxtLink
              v-for="(relatedPost, index) in getRelatedPosts"
              :key="`related-${index}`"
              :to="`/projects/${relatedPost.slug}`"
              class="rounded-lg border-[0.1px] p-4 bg-opacity-25 bg-neutral-300 border-neutral-200 dark:(bg-neutral-800/30 border-neutral-800) flex items-center space-x-2 hover:bg-opacity-40 transition-colors dark:text-white/80 dark:hover:text-white transition-colors"
            >
              <IconDocument class="w-4 h-4" />
              <span class="truncate">{{ relatedPost.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-2">
          <BlogPrevNext :current-slug="project.slug" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.dark .prose .nuxt-content-highlight {
  box-shadow: 0 0 0 100vmax #262626;

  pre {
    @apply bg-neutral-800;
  }
}

.light .nuxt-content-highlight {
  box-shadow: 0 0 0 100vmax #282c34;
}

.nuxt-content {
  .nuxt-content-highlight {
    clip-path: inset(0 -100vmax);

    @apply mb-5 relative;

    .filename {
      @apply font-light mt-3 mr-3 text-xs right-0 text-white/50 z-10 absolute;
    }

    pre {
      @apply rounded-none py-4 px-0;
    }
  }

  ol {
    @apply pl-0;
  }

  video {
    @apply rounded-lg;
  }

  kbd {
    @apply rounded-lg bg-black/10 dark:(bg-white/10 border-white/30) px-2 py-1 text-sm border-b-2 border-black/30 cursor-default;
  }

  code {
    @apply bg-blue-100 py-px px-1 text-blue-600 dark:bg-white/5;

    &::before,
    &::after {
      content: "`";
    }
  }
}
</style>
