<template>
	<div>
		<form @submit="submit">
			<div class="flex items-center justify-center">
				<div class="box p-10 rounded bg-slate-800 h-fit w-full flex">
					<img :src="imgsrc" alt="" class="h-20 w-20 rounded-full mr-5" />
					<div class="space-y-2">
						<span v-if="!name" class="text-white flex"
							>Update your profile <PencilIcon class="w-5 h-5 ml-2"
						/></span>
						<input
							v-model="name"
							class="text-sm text-white p-2 border-b bg-slate-800"
							placeholder="Full Name"
						/>
						<input
							v-model="imgsrc"
							class="text-sm text-white p-2 border-b bg-slate-800"
							placeholder="Photo URL"
						/>
						<button
							class="bg-slate-900 p-2 text-white w-full rounded"
							@click="updateProfile"
						>
							Update Profile
						</button>

						<div class="space-y-2 mt-5">
							<input
								v-model="email"
								class="text-sm text-white p-2 border-b bg-slate-800"
							/>
							<button
								class="bg-slate-900 p-2 text-white w-full rounded"
								@click="updateEmail"
							>
								Update Emaiil
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import { PencilIcon } from '@heroicons/vue/solid'

defineProps: {
	imgsrc: {
		type: String,
		default: 'https://picsum.photos/200/300',
	},
	name: {
		type: String,
		default: 'Name cannot be blank',
	},
}
</script>