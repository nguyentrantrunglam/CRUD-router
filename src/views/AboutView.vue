<template>
  <keep-alive>
    <FormPost :is="activeComponent"></FormPost>
  </keep-alive>
</template>

<script>
import FormPost from '@/components/FormPost.vue'
export default {
  name: "AboutView",
  components: {
    FormPost,
  }
}
</script>

<style>
</style>
