<h2 align="center">
🔥 Firekit
</h2>
 <h3>
   🔥 Starter template for Vue 3, Vite, Tailwind CSS and
   Firebase
  </h3>

<pre align="center">
🧪 Working in Progress
</pre>

<p align="center">
<br>
<a href="https://firekit-template.vercel.app/">🖥 Online Preview</a>
<br><br>
<a href="https://stackblitz.com/github/leighayanid/firekit-template"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>

## App Features

- 🔐 Firebase Auth
- 🔥 Firebase Firestore
- 💾 Firebase Storage
- 👱 Profile Management
- 🗒️ CRUD for Private Notes

## Project Features

- [💚 Vue 3](https://v3.Vuejs.org) - Composition API, components auto importing, modules, etc.

- ⚡️ Vite - Instant HMR

- 🎨 [TailwindCSS](https://tailwindcss.com) - Utility CSS Framework

- 😃 Use icons from any icon sets in HeroIcons

- 🔥 The `<script setup>` syntax

- 🍍 [State Management via Pinia](https://pinia.esm.dev/)

- 📥 APIs auto importing - for Composition API, VueUse and custom composables.

## Plugins

### Vue Modules

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs
- [Pinia](https://pinia.esm.dev/) - intuitive, type safe, light and flexible Store for Vue.
- [VueFinalModal](https://vue-final-modal.org/) - tiny, renderless, mobile-friendly, feature-rich modal component for Vue.js.
- [Vue-toaster](https://github.com/MeForma/vue-toaster) - toast notification plugin for vue 3
- [Vee-validate](https://vee-validate.logaretm.com/v4/) - form validation for Vue
- [yup](https://github.com/jquense/yup) - object schema validation
- [Vitest](https://vitest.dev) - Vue 3 testing framework powered by Vite

### Firebase 9 SDK

- [firebase/auth](https://firebase.google.com/docs/auth/web/start) - Firebase Auth
- [firebase/firestore](https://firebase.google.com/docs/firestore/quickstart) - Firestore
- [firebase/storage](https://firebase.google.com/docs/firestore/quickstart) - Storage

## IDE

We recommend using [VS Code](https://code.visualstudio.com/) with [Volar](https://github.com/johnsoncodehk/volar) to get the best experience (You might want to disable Vetur if you have it).

## Try it now

### Online

<a href="https://stackblitz.com/github/leighayanid/firekit-template"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/leighayanid/firekit-template/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit leighayanid/firekit-template <your-app-name>
cd <your-app-name>
npm i or yarn
```

Create a Firebase project. Copy and replace the configuration keys inside main.js

For Firestore security, paste the following into the console rules tab:

```
// Allow read/write access on all documents to any user signed in to the application
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

For storage, enable the storage feature in the Firebase console. Create a folder name 'profile'.

To secure the storage, paste the following into the console storage rules tab:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

That's it! You can now run the app and see it in action.

If you like it, please star the repo and share it with your friends.

Created by [leighayanid](https://leighdinaya.com) ❤️

Readme template by [antfu](https://github.com/antfu/vitesse-nuxt3)
