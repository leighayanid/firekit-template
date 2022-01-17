<template>
  <div class="bg-slate-800 border px-6 py-4 rounded-lg flex mt-2 h-48 relative">
    <div class="flex flex-col flex-1">
      <h1 class="text-white text-lg mb-2">🗒️ {{ note.title }}</h1>
      <p class="text-white break-all">{{ note.description }}</p>
    </div>
    <div class="actions absolute top-2/3 left-3/4 flex space-x-2">
      <button @click="$emit('deleteNote', note)">
        <TrashIcon
          class="w-8 h-8 hover:rounded-full p-2 hover:bg-slate-900 bg-slate-900 rounded-full"
        />
      </button>
      <button @click="$emit('showModal', note)">
        <PencilIcon
          class="w-8 h-8 hover:rounded-full p-2 hover:bg-slate-900 bg-yellow-600 rounded-full"
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
