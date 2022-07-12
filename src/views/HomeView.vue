<template>
  <keep-alive>
    <TablePost :is="activeComponent"></TablePost>
  </keep-alive>
</template>

<script>
import TablePost from '@/components/TablePost.vue';

export default {
  name: 'HomeView',
  components: {
    TablePost
  },

}
</script>
