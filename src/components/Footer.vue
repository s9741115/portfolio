<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  computed: {
    /**
     * Returns localized GitHub notice string in Turkish/English according to current route.
     * @returns {string}
     */
    getLocalizedNotice(): string {
      return "This project is open-source on GitHub, click to see the source code"
    },
  },
})
</script>

<template>
  <div
    class="bg-gray-100 text-sm w-full py-4 text-black/50 dark:(bg-white/5 text-white/30)"
  >
    <div class="responsive-screen">
      <div class="space-y-4 text-center sm:(space-y-0 space-x-6 text-left)">
        <SmartLink
          href="https://github.com/5SMNOONMS5/portfolio"
          class="text-center border-b border-transparent hover:border-black/10 dark:hover:border-white/10 transition-colors"
          blank
        >
          {{ getLocalizedNotice }}
        </SmartLink>
      </div>
    </div>
  </div>
</template>
