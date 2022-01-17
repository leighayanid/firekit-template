<template>
  <div>
    <button class="bg-slate-800 text-white p-2 rounded" @click="showModal">
      ✏️ New note
    </button>
    <div class="mt-10">
      <p class="text-lg">Private Note List</p>
      <span class="text-sm text-gray-100"
        >For devs: Firestore data model => user -> user uid -> notes
      </span>
      <NoteList />
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

<script setup>
import { ref, inject } from 'vue'
import AddNote from '@/components/todo/AddNote.vue'
import NoteList from '@/components/todo/NoteList.vue'
import NoteModal from '@/components/todo/NoteModal.vue'
const show = ref(false)
const vfm = inject('$vfm')

function showModal() {
  show.value = true
  vfm.show('add')
}

function cancel() {
  show.value = false
  vfm.hide('add')
}
</script>
