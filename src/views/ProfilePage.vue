<template>
  <div class="container">
    <h1 class="text-lg mb-5">Profile Information</h1>
    <div class="flex items-center justify-center">
      <div class="box p-10 rounded bg-slate-800 h-fit w-full">
        <div
          class="flex flex-col w-full text-center items-center space-y-2 mb-3"
        >
          <img :src="cPhotourl" alt="" class="h-20 w-20 rounded-full" />
          <UploadButton />
          <button @click="uploadProfilePhoto">Upload</button>
        </div>
        <div class="space-y-3">
          <span v-if="!name" class="text-white flex"
            >Update your profile <PencilIcon class="w-5 h-5 ml-2"
          /></span>
          <div class="flex flex-col">
            <label for="name" class="text-sm"> Full Name </label>
            <input
              v-model="cName"
              class="text-sm text-white p-2 border-b bg-slate-800 w-full"
              placeholder="Full Name"
            />
          </div>
          <div class="flex flex-col">
            <label for="photourl" class="text-sm">Photo URL</label>
            <input
              v-model="cPhotourl"
              class="text-sm text-white p-2 border-b bg-slate-800 w-full"
              placeholder="Photo URL"
            />
          </div>

          <button
            class="bg-slate-900 p-2 text-white w-full rounded"
            @click="updateProfile"
          >
            Update Profile
          </button>

          <div class="space-y-2 mt-5">
            <div class="flex flex-col">
              <label for="email">Email address</label>
              <input
                v-model="cEmail"
                class="text-sm text-white p-2 border-b bg-slate-800 w-full"
              />
            </div>

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
import UploadButton from '@/components/base/UploadButton.vue'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useUser } from '@/stores/user'
import { useStorage } from '@/composables/useFirebase'
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as sRef
} from 'firebase/storage'

const toast = inject('toast')

const userStore = useUser()
const { storage } = useStorage()

const name = ref('')
const photourl = ref('')
const email = ref('')

onMounted(() => {
  userStore.getUser()
  name.value = userStore.fullName
  photourl.value = userStore.avatar
  email.value = userStore.email
})

function uploadProfilePhoto() {
  const file = document.querySelector('input[type=file]').files[0]
  const photoRef = sRef(storage, `profile/${file.name}`)
  const uploadTask = uploadBytesResumable(photoRef, file)

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break
        case 'storage/canceled':
          break
        case 'storage/unknown':
          break
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        cPhotourl.value = downloadURL
        updateProfile()
      })
    }
  )
}

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
