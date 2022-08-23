<template>
  <Story>
    <Variant title="loggedIn">
      <Navbar :logged-in="loggedIn" />
    </Variant>
    <Variant title="loggedOut">
      <Navbar :logged-in="loggedIn" />
    </Variant>
  </Story>
</template>

<script setup>
import Navbar from './Navbar.vue'
</script>