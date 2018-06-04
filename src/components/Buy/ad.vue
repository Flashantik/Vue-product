<template>
  <v-container>
    <v-card class="buyCard" v-if="!loading">
      <v-layout>
      <v-flex xs12 sm6>
      <img :src=ad.imageSrc >
      </v-flex>
      <v-flex xs12 sm6>
      <h3 class="title">{{ad.title}}   <span class="price">${{ad.price}}</span></h3>
      <hr>
      <h4 class="mx-4">{{ad.fullDiscription}}</h4>
      </v-flex>
    </v-layout>
    </v-card>

    <app-loader v-else></app-loader>
  </v-container>
</template>


<script>
export default{
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
<style scoped>

.buyCard {
  transition: all 0.4s ease;
}


img{
  border-radius:15px; 
  filter: grayscale(50%);
  transition: filter 0.4s ease;
}

img {
max-width: 100%;
}
.buyCard:hover{
 box-shadow: 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .2);
}
.buyCard:hover img,.price {
filter: grayscale(0);
opacity: 1;
}


.title{
  display: flex;
  justify-content: center;
}

.price{
  transform: translateX(50%) translateY(-50%);
  position: absolute;
  background-color: red;
  opacity: .7;
  right: 0;
  border-radius:15%; 
  box-sizing: content-box;
}

</style>