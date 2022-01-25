<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="p-4 text-slate-800 dark:text-white md:px-80 md:py-10">
    <Navbar />
    <!-- <router-view /> -->
    <router-view v-slot="{ Component }" class="py-20">
      <template v-if="Component">
        <transition mode="out-in">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </div>
</template>

<style></style>
