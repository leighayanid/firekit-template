<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
	<div class="md:px-80 md:py-10 p-4 dark:text-white text-slate-800">
		<Navbar />
		<router-view class="py-20" />
	</div>
</template>

<style>
</style>
