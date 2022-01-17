<template>
  <div
    class="submit-form border-slate-900 dark:border-slate-50 border border-dashed p-5 rounded"
  >
    <h1 class="mb-4 text-lg">📓 Add note</h1>
    <div class="form-group flex flex-col mb-2">
      <label for="title">Title</label>
      <input
        id="title"
        v-model="title"
        type="text"
        class="text-sm text-white p-2 border-b bg-slate-800"
        required
        name="title"
      />
    </div>

    <div class="form-group flex flex-col">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="description"
        class="text-sm text-white p-2 border-b bg-slate-800"
        required
        name="description"
      />
    </div>
    <button
      class="bg-slate-800 text-white p-2 rounded w-full mt-2"
      @click="saveNotes"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const db = getFirestore()
const user = getAuth().currentUser

const title = ref('')
const description = ref('')

const saveNotes = async () => {
  try {
    await addDoc(collection(db, `user/${user.uid}/notes`), {
      title: title.value,
      description: description.value,
      created_at: Timestamp.now()
    })
    title.value = ''
    description.value = ''
    this.$emit('cancel')
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
</script>
