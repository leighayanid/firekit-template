<template>
	<vue-final-modal
		v-slot="{ params, close }"
		v-bind="$attrs"
		classes="flex justify-center items-center"
		overlay-style="opacity-10"
		content-class="relative flex flex-col max-h-full w-1/3 mx-4 p-10 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
		v-on="$listeners"
	>
		<span class="mr-8 text-2xl font-bold">
			<slot name="title"></slot>
		</span>
		<div class="flex-grow overflow-y-auto">
			<slot :params="params"></slot>
		</div>
		<button class="absolute top-0 right-0 mt-2 mr-2" @click="close">
			<XIcon class="w-8 h-8" />
		</button>
	</vue-final-modal>
</template>

<script setup>
import { XIcon } from '@heroicons/vue/solid'
</script>
