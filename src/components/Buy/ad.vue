<template>
<v-container fluid fill-height>
   <v-layout align-center justify-center  v-if="!buy">
    <v-card class="buyCard" v-if="!loading">
      <v-layout>
      <v-flex xs12 sm6 >
      <img :src=ad.imageSrc class="cardTitle">
      </v-flex>
      <v-flex xs12 sm6>
      <h3 class="title">{{ad.title}}<span class="price">${{ad.price}}</span></h3>
      <hr>
      <h4 class="mx-4">{{ad.fullDiscription}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer> <v-btn class="success" @click=" buy = !buy">Оформить покупку</v-btn>
    </v-layout>
    </v-card>
    <app-loader v-else-if="loading"></app-loader>
    </v-layout>
    <template v-if="buy">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <v-card dark>
            <v-container>
            <v-card light class="plastic" >
              <v-toolbar light>
                <v-toolbar-title>
                  <img src="https://firebasestorage.googleapis.com/v0/b/soft-planet.appspot.com/o/Untitled-1.png?alt=media&token=21dcbf8f-8048-4818-9254-d7b09ae73430" 
                style="width:90px"></v-toolbar-title> 
              </v-toolbar>
              <v-card-text class="pt-5">
                <v-flex xs12 sm10 md7 lg6>
                 <v-text-field v-model="number" light disabled mask="credit-card" placeholder="****    ****    ****    ****"></v-text-field>
                 <v-text-field v-model="name" light disabled  placeholder="Держатель карты"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field v-model="computedDateFormatted" light disabled  placeholder="Срок действия карты "></v-text-field>
              </v-flex>
              </v-card-text>
            </v-card>
            <v-flex xs12 sm10 md7 lg6>
            <v-text-field v-model="number" box mask="credit-card" label="Номер кредитной карты"></v-text-field>
            </v-flex>
            <v-flex xs12 sm10 md7 lg6>
                <v-text-field v-model="name" box label="Имя владельца карты"></v-text-field> 
               <v-menu
          :close-on-content-click="false"
          v-model="menu1"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="computedDateFormatted"
            label="Введите дату окончания действия карты"
            persistent-hint
            prepend-icon="event"
            readonly
            box
          ></v-text-field>
          <v-date-picker v-model="date" no-title @input="menu2 = false" type="month" locale="ru"></v-date-picker>
        </v-menu>
            </v-flex>
            </v-container>
          </v-card>
        </v-flex>

      </v-layout>
    </template>
</v-container>
</template>
<script>
export default {
  props: ['id'],
  data () {
    return {
      menu1: false,
      buy: false,
      number: '',
      name: '',
      date: null
    }
  },
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  methods: {
    buyed () {
      this.buy = !this.buy
    },
    formatDate (date) {
      if (!date) return null
      const [year, month] = date.split('-')
      return `${month}/${year}`
    }
  }
}
</script>


<style scoped>
.plastic{
  position: relative;
  bottom: 70px;
  border-radius: 18px; 
}

.blok{
  border-radius: 10px; 
}
.buyCard {
  transition: all 0.4s ease;
}


.cardTitle{
  border-radius:15px; 
  filter: grayscale(50%);
  transition: filter 0.4s ease;
}

.cardTitle {
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