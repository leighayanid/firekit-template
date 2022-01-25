<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="md:px-80 md:py-10 p-4 dark:text-white text-slate-800">
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
