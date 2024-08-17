<script setup lang="ts">
defineOptions({ name: 'AnButton' })
</script>

<template>
  <button><slot>按钮</slot></button>
</template>

<style lang="css" scoped>
@import "./style.css";
</style>
