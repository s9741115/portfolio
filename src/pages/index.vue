<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type {Repository} from "../types/Response/GitHub"
import Brand from "@/components/Icon/Brand.vue";
import SmartLink from "@/components/Smart/Link.vue";

interface Project {
  title: string
  description: string
  href?: string
  to?: string
  icon?: string
}

interface Experience {
  title: string
  url: string
  position: string
  date: string
  isHidden?: boolean
}

interface ExperienceObject {
  jobs: Experience[]
  education: Experience[]
}

export default Vue.extend({
  components: {SmartLink, Brand},
  data() {
    return {
      showModal: false,
      showExtra: {
        jobs: false,
        education: false,
      },
      repos: [] as Repository[],
      social: [
        {
          'title': 'GitHub',
          'url': 'https://github.com/5SMNOONMS5'
        },
        {
          'title': 'LinkedIn',
          'url': 'https://www.linkedin.com/in/chen-lee-sheng-8985b3b8/'
        },
      ],
      experiences: {
        jobs: [
          {
            title: "ISB 久大寰宇",
            url: "https://www.isb.com.tw/",
            position: "PHP Backend Developer",
            date: "2020/06 - ( 3 y 4 m )",
          },
          {
            title: "晶峰科技",
            url: "https://ct88.com.tw/",
            position: "iOS Developer",
            date: "2019/10 - 2020/06 ( 9 m )",
          },
          {
            title: "火燒雲科技",
            url: "https://pttcareers.com/Salary/1Kb1Kep0",
            position: "iOS Developer & Backend Developer",
            date: "2016/03 - 2019/03 ( 3 y )",
          },
          {
            title: "敦頤資訊",
            url: "https://www.coralline.com.tw/",
            position: "iOS Developer",
            date: "2015/01 - 2016/03 ( 1 y 2 m )",
            isHidden: true,
          },
          {
            title: "玩美集品",
            url: "https://www.perfect.tw/",
            position: "iOS Developer",
            date: "2014/07 - 2014/12 ( 6 m )",
            isHidden: true,
          }
        ],
        education: [
          {
            title: "實踐大學",
            url: "https://itc.kh.usc.edu.tw/",
            position: "資訊科技與通訊學系",
            date: "2008/09 - 2011/06 ( 3 y 10 m )",
          },
        ],
      } as ExperienceObject,
      cards: {
        me: [
          {
            title: "Repositories",
            description:
                "Want to see and/or contribute to my code and public repositories?",
            href: "/me/repos",
          },
          {
            title: "Songs",
            description:
                "Trust your taste? Compare your favourite songs and artists with mine!",
            href: "/me/songs",
          },
          {
            title: "Contact",
            description:
                "Want to get in touch? Send me a message!",
            href: "/me/contact",
          },
        ],
        pages: [
          {
            title: "部落格",
            description:
                "My Latest Blog Posts. I write about tech, programming and more!",
            href: "https://medium.com/me/stories/public",
          },
          {
            title: "專案",
            description:
                "All my projects, including open-source, side-projects and more!",
            href: "/projects",
          },
        ],
      },
      skills: [
        {
          title: "Development",
          items: [
            {
              title: "TypeScript",
            },
            {
              title: "Laravel & PHP",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png"
            },
            {
              title: "Docker",
              image: "https://d1.awsstatic.com/acs/characters/Logos/Docker-Logo_Horizontel_279x131.b8a5c41e56b77706656d61080f6a0217a3ba356d.png"
            },
            {
              title: "Nuxt3 | Vue3",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqc8y9vg7_R6EqZoXObhwRdkl2FH54VkWEcEpXO6HzWXHwoLSY6V1wKzazD7spkKw4mvY&usqp=CAU"
            },
            {
              title: "iOS",
              image: "https://cdn3.iconfinder.com/data/icons/social-media-logos-glyph/2048/5315_-_Apple-512.png"
            }
          ],
        },
        {
          title: "Apps",
          items: [
            {
              title: "PHPStorm",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/PhpStorm_Icon.svg/2048px-PhpStorm_Icon.svg.png",
            },
            {
              title: "Jira",
              image: "https://www.guidecx.com/wp-content/uploads/2023/08/Jira-Icon-Website.png"
            },
            {
              title: "WebStorm",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/WebStorm_Icon.svg/1024px-WebStorm_Icon.svg.png",
            },
            {
              title: "Figma",
            },
            {
              title: "Xcode",
              image: "https://cdn3.iconfinder.com/data/icons/macosxstyle/macosxstyle_png/128/Xcode.png"
            }
          ],
        },
        {
          title: "Services",
          items: [
            {
              title: "GCP",
              image: "data:image/png;base64,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",
            },
            {
              title: "Firebase",
            },
            {
              title: "Netlify",
              iconPack: "IconBrand",
            },
            {
              title: "Linode",
              image: "https://pbs.twimg.com/profile_images/1410588917666136073/_-zArZPH_400x400.png",
            },
          ],
        },
      ],
    }
  },
  head: {
    title: "Home",
  },
  methods: {
    async scrollToSection(id: string) {
      if (this.$route.hash === id)
        await this.$router.replace({
          hash: "",
        })

      await this.$router.replace({
        hash: id,
      })
    },
  },
})
</script>

<template>
  <div class="space-y-24 mb-10">
    <header
        class="rounded-md flex flex-col-reverse my-16 py-10 md:(flex-row items-center justify-between) justify-center"
    >
      <div class="md:w-8/12">
        <div class="space-y-6">
          <!--          <Status class="mt-4 flex justify-center md:justify-start"/>-->

          <h1
              class="font-semibold text-center text-4xl md:(text-6xl text-left) text-black/90 leading-normal dark:text-white/90"
          >
            Hi I am Ian Chen
          </h1>

          <h6
              class="font-semibold text-center md:(text-left) text-black/90 dark:text-white/90"
          >
            4 Years of Laravel and Vue <br>
            5 Years of iOS
          </h6>

          <h6
            class=" text-center md:(text-left) text-black-300 dark:text-white/90"
          >
            tasb00429@gmail.com
          </h6>

          <div
              class="flex items-center justify-center md:justify-start gap-x-3 gap-y-2 flex-wrap"
          >
            <Button
                v-for="item in ['Vue.js', 'PHP']"
                :key="item"
                class="inline-block"
            >
              <IconDev :brand="item" class="h-5 w-5"/>
            </Button>

            <Button
                v-for="item in social"
                :key="item"
                class="inline-block"
            >
              <SmartLink :href="item.url">
                <IconBrand :brand="item.title" class="h-5 w-5"/>
              </SmartLink>
            </Button>

            <Button
                v-tippy="{ content: 'More', placement: 'bottom' }"
                @click.native="scrollToSection('#technologies')"
            >
              <IconEllipsis class="h-5 w-5"/>
            </Button>


          </div>
        </div>
      </div>

      <div class="rounded-full mx-auto mb-4 md:mb-0">
        <SmartImage
            src="/assets/images/memoji.png"
            class="rounded-full h-40 w-40"
        />
      </div>
    </header>

    <section id="pages">
      <Title>Pages</Title>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <Card
            v-for="(card, index) in cards.pages"
            :key="`card-p-${index}`"
            :title="card.title"
            :href="card.href"
        >
          {{ card.description }}
        </Card>
      </div>
    </section>

    <!--    <section id="me">-->
    <!--      <Title>Me</Title>-->
    <!--      <div class="mt-4 grid gap-4 md:grid-cols-2">-->
    <!--        <Card-->
    <!--          v-for="(card, index) in cards.me"-->
    <!--          :key="`card-m-${index}`"-->
    <!--          :title="card.title"-->
    <!--          :href="card.href"-->
    <!--        >-->
    <!--          {{ card.description }}-->
    <!--        </Card>-->
    <!--      </div>-->
    <!--    </section>-->

    <section id="experiences" class="grid gap-x-8 gap-y-24 md:grid-cols-2">
      <div>
        <div class="flex items-center gap-4 justify-between">
          <Title>Experience</Title>
          <button
              type="button"
              class="text-black/50 text-sm hover:underline dark:text-white/30"
              @click="showExtra.jobs = !showExtra.jobs"
          >
            {{ showExtra.jobs ? "show less" : "show more" }}
          </button>
        </div>

        <div class="mt-4 grid gap-2">
          <CardExperience
              v-for="(experience, index) in experiences.jobs"
              v-show="experience.isHidden ? showExtra.jobs : true"
              :key="`experience-job-${index}`"
              :title="experience.title"
              :url="experience.url"
              :hidden-badge="experience.isHidden"
              :date="experience.date"
              :position="experience.position"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center gap-4 justify-between">
          <Title>Education</Title>
          <button
              type="button"
              class="text-black/50 text-sm hover:underline dark:text-white/30"
              @click="showExtra.education = !showExtra.education"
          >
            {{ showExtra.education ? "show less" : "show more" }}
          </button>
        </div>

        <div class="mt-4 grid gap-2">
          <CardExperience
              v-for="(experience, index) in experiences.education"
              v-show="experience.isHidden ? showExtra.education : true"
              :key="`experience-education-${index}`"
              :title="experience.title"
              :url="experience.url"
              :hidden-badge="experience.isHidden"
              :date="experience.date"
              :position="experience.position"
          />
        </div>
      </div>
    </section>

    <section id="technologies">
      <Title>Technologies I use</Title>

      <div class="flex flex-col space-y-6 mt-8">
        <section v-for="category in skills" :key="category.title">
          <h5
              class="text-sm uppercase text-black/50 pb-2 mb-4 border-b border-black/5 dark:(text-white/30 border-white/5)"
          >
            {{ category.title }}
          </h5>

          <div
              class="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-x-2 gap-y-2"
          >
            <CardSkill
                v-for="(skill, index) in category.items"
                :key="`skill-${index}`"
                v-bind="typeof skill === 'object' ? skill : { title: skill }"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.description-link {
  @apply border-neutral-500 border-b-2 border-opacity-50 hover:border-opacity-75;
}
</style>
