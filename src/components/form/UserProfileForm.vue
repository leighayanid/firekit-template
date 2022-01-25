<template>
  <div>
    <form @submit="submit">
      <div class="flex items-center justify-center">
        <div class="box flex h-fit w-full rounded bg-slate-800 p-10">
          <img :src="imgsrc" alt="" class="mr-5 h-20 w-20 rounded-full" />
          <div class="space-y-2">
            <span v-if="!name" class="flex text-white"
              >Update your profile <PencilIcon class="ml-2 h-5 w-5"
            /></span>
            <input
              v-model="name"
              class="border-b bg-slate-800 p-2 text-sm text-white"
              placeholder="Full Name"
            />
            <input
              v-model="imgsrc"
              class="border-b bg-slate-800 p-2 text-sm text-white"
              placeholder="Photo URL"
            />
            <button
              class="w-full rounded bg-slate-900 p-2 text-white"
              @click="updateProfile"
            >
              Update Profile
            </button>

            <div class="mt-5 space-y-2">
              <input
                v-model="email"
                class="border-b bg-slate-800 p-2 text-sm text-white"
              />
              <button
                class="w-full rounded bg-slate-900 p-2 text-white"
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
