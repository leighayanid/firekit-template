<script>
import { SkeletonBlock, SkeletonText } from 'skeleton-elements/vue'

export default {
  components: {
    SkeletonBlock,
    SkeletonText
  }
}
</script>

<template>
  <div class="mb-2 flex flex-col rounded bg-slate-800 p-5">
    <SkeletonBlock
      width="80%"
      height="20px"
      effect="wave"
      border-radius="3px"
      class="mb-2"
    />

    <skeleton-text tag="div" effect="wave" border-radius="3px">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet
      ante dui. Praesent ut aliquam metus. Phasellus consectetur.
    </skeleton-text>
  </div>
</template>
