<script setup>
import { ref, inject, defineAsyncComponent } from 'vue'
import CardSkeleton from '@/components/skeleton/CardSkeleton.vue'
import AddNote from '@/components/todo/AddNote.vue'
import NoteModal from '@/components/todo/NoteModal.vue'

const show = ref(false)
const vfm = inject('$vfm')

const NoteList = defineAsyncComponent(() =>
  import('@/components/todo/NoteList.vue')
)

function showModal() {
  show.value = true
  vfm.show('add')
}

function cancel() {
  show.value = false
  vfm.hide('add')
}
</script>

<template>
  <div>
    <button class="rounded bg-slate-800 p-2 text-white" @click="showModal">
      ✏️ New note
    </button>
    <div class="mt-10">
      <p class="text-lg">Private Note List</p>
      <span class="text-sm text-gray-100"
        >For devs: Firestore data model => user -> user uid -> notes
      </span>
      <suspense timeout="0">
        <NoteList class="mt-10" />
        <template #fallback>
          <div class="mt-10 grid grid-cols-2 gap-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </template>
      </suspense>
    </div>
    <div class="modal">
      <note-modal
        v-model="show"
        name="add"
        @cancel="cancel"
        @confirm="updateNote(params)"
      >
        <template #title><h1 class="mb-2">Add Note</h1></template>
        <template #default>
          <AddNote />
        </template>
      </note-modal>
    </div>
  </div>
</template>
