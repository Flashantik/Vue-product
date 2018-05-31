<template>
<v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h1 class="text --secondary mb-3 btn-add">Список объявок <v-btn fab dark color="indigo"
      :to="'/new-ads'">
      <v-icon dark>add</v-icon>
    </v-btn></h1>
      <div class="elevation-10">
      <v-card
      v-for="ad in ads"
      :key="ad.id"
      flat
      >
          <v-layout row>
            <v-flex xs12>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions class="borderbtm">
                <v-spacer></v-spacer> 
                <v-dialog class="notfull" v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                 <v-btn slot="activator" class="success" :to="'/buy/'+ ad.id">Открыть</v-btn>
                  <v-card dark>
                    <v-toolbar light>
                      <v-btn icon light @click.native="dialog = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ad.title}}</v-toolbar-title>
                    </v-toolbar>
                    {{ad.description}}
                  </v-card>
                </v-dialog>  
                <v-btn></v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
          <hr>
      </v-card>
      </div>
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
    }
  }
}
</script>
<style scoped>
.btn-add{
  display:flex;
  justify-content:space-between;
}

</style>