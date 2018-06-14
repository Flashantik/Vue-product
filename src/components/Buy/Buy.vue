<template>
<v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h1 class="text --secondary mb-3 btn-add">Список объявок <v-btn fab dark color="indigo"
      :to="'/new-ads'">
      <v-icon dark>add</v-icon>
    </v-btn></h1>
      <div class="elevation-10" row v-if="!loading">
      <v-card
      v-for="ad in ads"
      :key="ad.id"
      flat 
      class="card"
      >
          <v-layout> 
            <v-flex xs12>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}} <span class="price"> ${{ad.price}} </span></h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions class="borderbtm">
                <v-spacer></v-spacer> 
                 <v-btn class="success" :to="'/buy/'+ ad.id">Открыть</v-btn>
           
              </v-card-actions>
            </v-flex>
          </v-layout>
          
          <hr>
      </v-card>
      </div>
      <app-loader v-else></app-loader>
    </v-flex>
  </v-layout>

</v-container>
</template>

<script>

export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
<style scoped>
.btn-add{
  display:flex;
  justify-content:space-between;
}

.price{
  position: absolute;
  right: 0;
  top: 0;
  color: red;
  opacity: 0;
}
span {
    transition: all .5s ease;
}
.card:hover h2>span {
opacity: 1;
}
</style>