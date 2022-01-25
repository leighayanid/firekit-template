<template>
  <div class="relative mt-2 flex h-48 rounded-lg border bg-slate-800 px-6 py-4">
    <div class="flex flex-1 flex-col">
      <h1 class="mb-2 text-lg text-white">🗒️ {{ note.title }}</h1>
      <p class="break-all text-white">{{ note.description }}</p>
    </div>
    <div class="actions absolute top-2/3 left-3/4 flex space-x-2">
      <button @click="$emit('deleteNote', note)">
        <TrashIcon
          class="h-8 w-8 rounded-full bg-slate-900 p-2 hover:rounded-full hover:bg-slate-900"
        />
      </button>
      <button @click="$emit('showModal', note)">
        <PencilIcon
          class="h-8 w-8 rounded-full bg-yellow-600 p-2 hover:rounded-full hover:bg-slate-900"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon, PencilIcon } from '@heroicons/vue/solid'

// eslint-disable-next-line no-undef
defineProps({
  note: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>
