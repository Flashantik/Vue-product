<template>
  <v-container>
    <h3>{{ad.title}}</h3>
    <v-card>

    </v-card>
  </v-container>
</template>

<script>
export default{
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    }
  }
}
</script>
<style scoped>
</style>