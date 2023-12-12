<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type {Project} from "@/types/Post"
import type {FetchReturn} from "@nuxt/content/types/query-builder"

export default Vue.extend({
  data() {
    return {
      formatter: new Intl.DateTimeFormat("tr-TR", {
        month: "short",
        day: "numeric",
      }),
      query: this.$route.query,
      projects: [] as (Project[] & FetchReturn) | (Project[] & FetchReturn)[],
    }
  },
  fetchOnServer: false,
  async fetch() {
    this.projects = await this.$content("projects")
      .without(["body"])
      .fetch<Project[]>()
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
    getTypeGroupedProjects() {
      const typeOfProjects = new Map() as Map<number, Project[]>

      for (const project of this.projects) {
        if (!project.type) continue

        if (typeOfProjects.has(project.type)) {
          typeOfProjects.get(project.type)?.push(project as Project)
        } else {
          typeOfProjects.set(project.type, [project as Project])
        }
      }

      const type = [...typeOfProjects.keys()].sort((a, b) => b - a)
      const sortedByTypes = new Map() as Map<number, Project[]>

      for (const year of type) {
        sortedByTypes.set(year, typeOfProjects.get(year)!)
      }

      return sortedByTypes
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
  <LoadersBlog v-if="$fetchState.pending || $fetchState.error !== null"/>

  <div v-else class="mt-12 space-y-10">
    <section
      v-for="[year, projects] in getTypeGroupedProjects"
      :key="year"
      class="space-y-4"
    >
      <h1 class="text-3xl font-bold text-black/90 dark:text-white/90">
        {{ year }}
      </h1>

      <div class="space-y-3 card-base"
           v-for="project in projects"
           :key="project.slug"
      >
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="flex items-start gap-6 rounded-lg"
        >
<!--          <span-->
<!--            class="w-[20%] text-black/50 dark:text-white/50 md:w-1/12 flex-shrink-0"-->
<!--          >-->
<!--            *-->
<!--          </span>-->

          <span
            class="text-blue-600 dark:text-blue-300 font-medium leading-relaxed"
          >
            {{ project.title }}
          </span>
        </NuxtLink>
        <div>
            <span
              class="text-gray-400 dark:text-blue-200 leading-relaxed"
            >
            {{ project.description }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
