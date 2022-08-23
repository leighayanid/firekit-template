<script setup>
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  getDocs,
  updateDoc
} from 'firebase/firestore'
import { onMounted, ref, inject, onErrorCaptured } from 'vue'
import NoteModal from '@/components/todo/NoteModal.vue'
import NoteListItem from './NoteListItem.vue'

import { useAuth, useFirestore } from '@/composables/useFirebase'
// inject
const toast = inject('toast')
const vfm = inject('$vfm')

// variables
const notes = ref([])
const { db } = useFirestore()
const { user } = useAuth()
const show = ref(false)
const error = ref(null)

onErrorCaptured((err) => {
  error.value = err.message
})

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, `user/${user.uid}/notes`))
  querySnapshot.forEach((doc) => {
    notes.value.push({ id: doc.id, ...doc.data() })
  })

  onSnapshot(collection(db, `user/${user.uid}/notes`), (snapshot) => {
    notes.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  })
})

// delete note
const deleteNote = async (note) => {
  console.log(note.id)
  try {
    await deleteDoc(doc(db, `user/${user.uid}/notes`, note.id))
    toast.success(`Note deleted`, {
      position: 'top-right',
      duration: 1000
    })
  } catch (error) {
    console.error('Error deleting note: ', error)
  }
}

function showModal(note) {
  show.value = true
  vfm.show('edit', {
    title: note.title,
    description: note.description,
    id: note.id
  })
}

const updateNote = async (note) => {
  await updateDoc(doc(db, `user/${user.uid}/notes`, note.id), {
    title: note.title,
    description: note.description
  })
  vfm.hide('edit')
}

const cancel = () => {
  show.value = false
  vfm.hide('edit')
}
</script>

<template>
  <div>
    <div v-auto-animate="{ duration: 200 }" class="grid grid-cols-2 gap-3">
      <NoteListItem
        v-for="note in notes"
        :key="note.id"
        data-test="note-list"
        :note="note"
        @delete-note="deleteNote(note)"
        @show-modal="showModal(note)"
      />
    </div>

    <note-modal
      v-model="show"
      name="edit"
      @cancel="cancel"
      @confirm="updateNote(params)"
    >
      <template #title><h1 class="mb-2">Edit Note</h1></template>
      <template #default="{ params }">
        <div
          class="
            submit-form
            rounded
            border border-dashed border-slate-900
            p-5
            dark:border-slate-50
          "
        >
          <div class="form-group mb-2 flex flex-col">
            <label for="title">Title</label>
            <input
              id="title"
              v-model="params.title"
              type="text"
              class="border-b bg-slate-800 p-2 text-sm text-white"
              required
              name="title"
            />
          </div>

          <div class="form-group flex flex-col">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="params.description"
              class="border-b bg-slate-800 p-2 text-sm text-white"
              required
              name="description"
            />
          </div>
          <button
            class="mt-2 w-full rounded bg-slate-800 p-2 text-white"
            @click="updateNote(params)"
          >
            Update
          </button>
        </div>
      </template>
    </note-modal>
  </div>
</template>

