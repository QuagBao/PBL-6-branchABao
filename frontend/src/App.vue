<script setup>
// Không cần import trực tiếp các component SignIn hoặc SignUp ở đây
</script>

<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

