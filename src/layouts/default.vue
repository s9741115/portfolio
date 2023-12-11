<script lang="ts">
import Vue from "vue"

// Types
import type {Post} from "~/src/types/Post"
import type {FetchReturn} from "@nuxt/content/types/query-builder"

export default Vue.extend({
  data() {
    return {
      projects: [] as (Post[] & FetchReturn) | (Post[] & FetchReturn)[],
    }
  },
  fetchOnServer: false,
  async fetch() {
    this.projects = await this.$content("projects")
      .sortBy("createdAt", "desc")
      .only(["title", "slug"])
      .fetch<Post[]>()
  },
  head() {
    let string = "Stephen Chen - portfolio"

    return {
      titleTemplate: `%s - ${string}`,
      htmlAttrs: {
        class: `min-h-screen ${this.$colorMode.value}`,
      },
      meta: [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: string,
        },
      ],
    }
  },
  computed: {
    menuActions() {
      return [
        /* Navigation */
        {
          section: "Navigation",
          text: "Home",
          icon: "IconHome",
          action: () => {
            this.$router.push("/")
          },
        },
        {
          section: "Navigation",
          text: "Project",
          tag: "Search a project",
          icon: "IconDocument",
          keybindings: ["b"],
          childActions: [
            {
              text: "All Projects",
              icon: "IconEye",
              action: () => {
                this.$router.push("/projects")
              },
            },
            ...this.projects.map((project: Post) => ({
              text: project.title,
              icon: "IconDocument",
              action: () => {
                this.$router.push(`/projects/${project.slug}`)
              },
            })),
          ],
        },
        // {
        //   section: "Navigation",
        //   text: "Projects",
        //   icon: "IconCog",
        //   action: () => {
        //     this.$router.push("/projects")
        //   },
        // },
        // {
        //   section: "Navigation",
        //   text: "Donate",
        //   icon: "IconDollar",
        //   action: () => {
        //     this.$router.push("/donate")
        //   },
        // },
        // {
        //   section: "Navigation",
        //   text: "Daily Song",
        //   icon: "IconMusicNote",
        //   action: () => {
        //     this.$router.push("/daily")
        //   },
        // },

        /* Me */
        // {
        //   section: "Me",
        //   text: "Repositories",
        //   icon: "IconBranch",
        //   action: () => {
        //     this.$router.push("/me/repos")
        //   },
        // },
        // {
        //   section: "Me",
        //   text: "Songs",
        //   icon: "IconStar",
        //   action: () => {
        //     this.$router.push("/me/songs")
        //   },
        // },
        // {
        //   section: "Me",
        //   text: "Contact",
        //   icon: "IconInbox",
        //   action: () => {
        //     this.$router.push("/me/contact")
        //   },
        // },

        /* Quick Links */
        {
          section: "Quick Links",
          text: "GitHub",
          icon: "IconBrand:github",
          action: () => {
            window.open(this.$config.social.github, "_blank")?.focus()
          },
        },
        {
          section: "Quick Links",
          text: "Twitter",
          icon: "IconBrand:twitter",
          action: () => {
            window.open(this.$config.social.twitter, "_blank")?.focus()
          },
        },

        /* Controls */
        {
          section: "Controls",
          text: "Toggle Color Mode",
          icon: "IconSun",
          action: () => {
            this.$colorMode.preference =
              this.$colorMode.value === "dark" ? "light" : "dark"
          },
        },
      ]
    },
  },
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-neutral-900">
    <Navbar class="pt-10" />

    <!-- Nuxt component -->
    <main class="responsive-screen min-h-screen pb-8">
      <Nuxt />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Command Palette -->
    <CommandMenu :actions="menuActions" :theme="$colorMode.value">
      <template v-slot:icon="{ icon }">
        <component
          :is="icon.split(':')[0]"
          :brand="icon.split(':')[1]"
          class="w-4 h-4"
        />
      </template>
    </CommandMenu>

    <!-- Go to top button -->
    <GoTop />

    <!-- Sponsor Popup -->
<!--    <SponsorPopup />-->
  </div>
</template>
