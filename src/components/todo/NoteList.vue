<template>
	<div>
		<div class="grid grid-cols-2 gap-3">
			<NoteListItem
				:is="$slots.default?.()[0]"
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
						border-slate-900
						dark:border-slate-50
						border border-dashed
						p-5
						rounded
					"
				>
					<div class="form-group flex flex-col mb-2">
						<label for="title">Title</label>
						<input
							id="title"
							v-model="params.title"
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
							v-model="params.description"
							class="text-sm text-white p-2 border-b bg-slate-800"
							required
							name="description"
						/>
					</div>
					<button
						class="bg-slate-800 text-white p-2 rounded w-full mt-2"
						@click="updateNote(params)"
					>
						Update
					</button>
				</div>
			</template>
		</note-modal>
	</div>
</template>

<script setup>
import {
	getFirestore,
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
import { getAuth } from '@firebase/auth'

// inject
const toast = inject('toast')
const vfm = inject('$vfm')

// variables
const notes = ref([])
const db = getFirestore()
const user = getAuth().currentUser
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
