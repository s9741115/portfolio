<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type {Post} from "@/types/Post"
import type {FetchReturn} from "@nuxt/content/types/query-builder"

export default Vue.extend({
  data() {
    return {
      formatter: new Intl.DateTimeFormat("tr-TR", {
        month: "short",
        day: "numeric",
      }),
      query: this.$route.query,
      projects: [] as (Post[] & FetchReturn) | (Post[] & FetchReturn)[],
    }
  },
  fetchOnServer: false,
  async fetch() {
    this.projects = await this.$content("projects")
      .without(["body"])
      .fetch<Post[]>()
  },
  head() {
    const title = "Stephen Chen Projects"
    const description =
      "All my projects in my career"

    return {
      title: "Projects",
      meta: this.$prepareMeta({
        title,
        description,
      }),
    }
  },
  computed: {
    isFetchPending() {
      return (
        this.$fetchState?.pending === true && this.$fetchState.error !== null
      )
    },
    getYearGroupedPosts() {
      const yearsOfPosts = new Map() as Map<number, Post[]>

      for (const project of this.projects) {
        if (!project.createdAt) continue
        const year = new Date(project.createdAt).getFullYear()

        if (yearsOfPosts.has(year)) {
          yearsOfPosts.get(year)?.push(project as Post)
        } else {
          yearsOfPosts.set(year, [project as Post])
        }
      }

      const years = [...yearsOfPosts.keys()].sort((a, b) => b - a)
      const sortedByYears = new Map() as Map<number, Post[]>

      for (const year of years) {
        sortedByYears.set(year, yearsOfPosts.get(year)!)
      }

      return sortedByYears
    },
  },
  watch: {
    "$route.query": "setQuery",
  },
  mounted() {
    this.setQuery()
  },
  methods: {
    setQuery() {
      this.query = this.$route.query
    },
  },
})
</script>

<template>
  <LoadersBlog v-if="$fetchState.pending || $fetchState.error !== null" />

  <div v-else class="mt-12 space-y-10">
    <section
      v-for="[year, projects] in getYearGroupedPosts"
      :key="year"
      class="space-y-4"
    >
      <h1 class="text-3xl font-bold text-black/90 dark:text-white/90">
        {{ year }}
      </h1>

      <div class="space-y-3">
        <NuxtLink
          v-for="project in projects"
          :key="project.slug"
          :to="`/projects/${project.slug}`"
          class="flex items-start gap-6 card-base rounded-lg"
        >
          <span
            class="w-[20%] text-black/50 dark:text-white/50 md:w-1/12 flex-shrink-0"
          >
            {{ formatter.format(new Date(project.createdAt)) }}
          </span>

          <span
            class="text-blue-600 dark:text-blue-300 font-medium leading-relaxed"
          >
            {{ project.title }}
          </span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
