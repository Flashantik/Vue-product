<template>
<v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="pa-5">
      <h1>Создание нового объявления</h1> 
      <v-form ref="form" v-model="valid" validation >
          <v-text-field prepend-icon="person" 
          name="Title" 
          label="Название программы" 
          type="text"
          v-model="title"
          autofocus
          clearable
          :rules="[v => !!v || 'Требуется название']"
          ></v-text-field>
          <v-text-field prepend-icon="person" name="description-min" 
          label="Краткое описание программы" 
          type="text"
          hint="asdasdadssd"
          v-model="description"
          :counter="120"
          multi-line
        ></v-text-field>
          <v-text-field prepend-icon="person" 
          name="description" 
          label="Полное описание программы" 
          type="text"
          v-model="fullDiscription"
          :counter="700"
          multi-line
          :rules="[v => !!v || 'Требуется описание']"
        ></v-text-field>
          <v-text-field prepend-icon="lock" 
          name="password" 
          label="Пароль" 
          type="text"
          v-model="price"
          :rules="[v => !!v || 'Требуется указать цену']"
          ></v-text-field>
        </v-form>
        <v-layout>
          <v-spacer></v-spacer>
        <v-btn class="success" 
         @click="createOrder"
        :disabled="!valid || loading"
        :loading="loading"
        >Создать объявление</v-btn> </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default{

  data () {
    return {
      title: '',
      description: '',
      fullDiscription: '',
      valid: false,
      price: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createOrder () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          fullDiscription: this.fullDiscription,
          price: this.price
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/buy')
          })
          .catch(() => {})
      }
    }
  }

}
</script>
<style scoped>
v-text-field{
  overflow: hidden;
}
</style>