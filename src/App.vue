<template>
  <v-app>
  <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      temporary
      dark
      absolute>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="(item,index) in items" :key="index" @click="''" :to="item.url">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark>
      <v-toolbar-side-icon
      class="hidden-md-and-up" 
      @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" tag="span" class="pointer"><v-toolbar-title>Soft-planet</v-toolbar-title></router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">



<!-- /*
 
                   ########  ########   #######  ########  ########   #######  ##      ## ##    ##    
                   ##     ## ##     ## ##     ## ##     ## ##     ## ##     ## ##  ##  ## ###   ##    
                   ##     ## ##     ## ##     ## ##     ## ##     ## ##     ## ##  ##  ## ####  ##    
                   ##     ## ########  ##     ## ########  ##     ## ##     ## ##  ##  ## ## ## ##    
                   ##     ## ##   ##   ##     ## ##        ##     ## ##     ## ##  ##  ## ##  ####    
                   ##     ## ##    ##  ##     ## ##        ##     ## ##     ## ##  ##  ## ##   ###    
                   ########  ##     ##  #######  ##        ########   #######   ###  ###  ##    ##    
 
*/ -->
       <template v-if= "userlogged">       
           <v-menu>
       <v-btn flat  slot="activator">
         <v-icon>person_outline</v-icon>
          <span class="mx-auto">Данные аккаунта</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile class="pointers" v-for="val in userOpt" :key="val.title">
            <v-list-tile-title v-text="val.title" @click=val.methods></v-list-tile-title>
            </v-list-tile>
        </v-list>
           
      </v-menu> 
      
      </template>
        <v-btn flat 
        v-for="(item,index) in items" 
        :key="index"
        :to="item.url"> 
          <v-icon left>{{item.icon}}</v-icon>
         {{item.title}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
     
<!-- /*
 
                   ######## ########  ########   #######  ########  
                   ##       ##     ## ##     ## ##     ## ##     ## 
                   ##       ##     ## ##     ## ##     ## ##     ## 
                   ######   ########  ########  ##     ## ########  
                   ##       ##   ##   ##   ##   ##     ## ##   ##   
                   ##       ##    ##  ##    ##  ##     ## ##    ##  
                   ######## ##     ## ##     ##  #######  ##     ## 
 
*/ -->

      <template v-if="error">
      <v-snackbar
      :timeout="5000"
      :top="true"
      :multi-line="true"
      @input="closeError"
      :value="true"
      color="white"
    >
    {{error}}
      <v-btn flat light color="red" @click.native="closeError">Закрыть 
      </v-btn>
    </v-snackbar>
    </template>
    {{userdata}}
    <v-footer height="auto">
      <v-card
      flat
      tile
      class="text-xs-center"
      dark
    >
      <v-card-text>
        <v-btn
          v-for="(val,index) in icons"
          :key="index"
          icon
          class="mx-3 white--text"
        >
          <v-icon size="24px">{{ val }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>
      <v-card-text class="white--text">
        &copy;2018 — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
    </v-footer>
  
  
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
        drawer: false,
        icons: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
        userOpt: [{ title: 'Аккаунт', methods: '' }, {title: 'Ваши заказы', methods: ''}, {title: 'Выйти из аккаунта', methods: this.onLogout
        }
        ],
        mini: false
      }
    },
    computed: {
      error () {
        return this.$store.getters.error
      },
      userlogged () {
        return this.$store.getters.userlogged
      },
      items  () {
        if (this.userlogged) {
          return [
          { title: 'Домой', icon: 'dashboard', url: '/' },
          { title: 'Купить', icon: 'monetization_on', url: '/buy' },
          { title: 'Заказать', icon: 'shopping_cart', url: '/order' }
          ]
        }
        return [ { title: 'Домой', icon: 'dashboard', url: '/' },
          { title: 'Купить', icon: 'monetization_on', url: '/buy' },
          { title: 'Заказать', icon: 'shopping_cart', url: '/order' },
          { title: 'Зарегистрироваться', icon: 'face', url: '/registration' },
          { title: 'Войти', icon: 'lock', url: '/login' }]
      },
      userdata () {
        return this.$store.getters.userOpt
      }
    },
    methods: {
      closeError () {
        this.$store.dispatch('clearError')
      },
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
.pointer{
  cursor: pointer;
}

.pointers{
  cursor: pointer;
  transition: background-color .3s ease;
}

.pointers:hover{
background-color: gainsboro;
}

.pointers:mouse-leave {
  transition: background-color .8s ease;
  background-color: gainsboro;
}
[v-cloak] > * { display:none }
[v-cloak]::before { content: "loading…" }
</style>
