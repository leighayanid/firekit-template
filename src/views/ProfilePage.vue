<template>
  <div class="container">
    <h1 class="text-lg mb-5">Profile Information</h1>
    <div class="flex items-center justify-center">
      <div class="box p-10 rounded bg-slate-800 h-fit w-full flex">
        <img :src="cPhotourl" alt="" class="h-20 w-20 rounded-full mr-5" />
        <div class="space-y-2">
          <span v-if="!name" class="text-white flex"
            >Update your profile <PencilIcon class="w-5 h-5 ml-2"
          /></span>
          <input
            v-model="cName"
            class="text-sm text-white p-2 border-b bg-slate-800"
            placeholder="Full Name"
          />
          <input
            v-model="cPhotourl"
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
              v-model="cEmail"
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
  </div>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/solid'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useUser } from '@/stores/user'
const toast = inject('toast')

const userStore = useUser()

const name = ref('')
const photourl = ref('')
const email = ref('')

onMounted(() => {
  userStore.getUser()
  name.value = userStore.fullName
  photourl.value = userStore.avatar
  email.value = userStore.email
})

// computed name with getter and setter
const cName = computed({
  get() {
    return name.value
  },

  set(value) {
    name.value = value
  }
})

const cEmail = computed({
  get() {
    return email.value
  },

  set(value) {
    email.value = value
  }
})

const cPhotourl = computed({
  get() {
    return photourl.value
  },

  set(value) {
    photourl.value = value
  }
})

watch(cName, (value) => {
  cName.value = value
})

watch(cPhotourl, (value) => {
  cPhotourl.value = value
})

watch(cEmail, (value) => {
  cEmail.value = value
})
const updateProfile = async () => {
  await userStore.updateProfileInfo({
    name: cName.value,
    imgsrc: cPhotourl.value
  })
  toast.show('Profile Updated', {
    duration: 1000,
    type: 'success'
  })
}

const updateEmail = async () => {
  await userStore.updateEmailInfo({
    email: email.value
  })
  toast.show('Email Updated', {
    duration: 1000,
    type: 'success'
  })
}
</script>
