<template>
<v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="pa-5">
      <h1>Создание нового объявления</h1> 
      <v-form ref="form" v-model="valid" validation >
          <v-text-field prepend-icon="label" 
          name="Title" 
          label="Название программы" 
          type="text"
          v-model="title"
          autofocus
          clearable
          hint="Введите название своего проекта. Напр. Calculator for windows v2*"
          :rules="[v => !!v || 'Требуется название']"
          ></v-text-field>
          <v-text-field prepend-icon="font_download" name="description-min" 
          label="Краткое описание программы" 
          type="text"
          hint="Краткое описание не обязателльно для заполнения"
          v-model="description"
          :counter="120"
          multi-line
          rows="2"
        ></v-text-field>
          <v-text-field prepend-icon="description" 
          name="description" 
          label="Полное описание программы" 
          type="text"
          v-model="fullDiscription"
          :counter="700"
          multi-line
          rows="3"
          hint="Введите полное описание вашей программы"
          :rules="[v => !!v || 'Требуется описание']"
        ></v-text-field>
          <v-text-field prepend-icon="attach_money" 
          name="price" 
          label="Цена" 
          type="number"
          v-model="price"
           hint="Введите цену за ваш проект в $"
          :rules="[v => !!v || 'Требуется указать цену']"
          ></v-text-field>
          <input 
          ref="fileInput" 
          type="file" 
          style="display:none" 
          accept="image/*"
          @change="onFileChange"
          >
        <h3 class="mt-5">На каких платформах работает:</h3>
        <v-checkbox v-model="selected" label="Windows" value="Windows"></v-checkbox>
        <v-checkbox v-model="selected" label="Linux" value="Linux"></v-checkbox>
        <v-checkbox v-model="selected" label="Mac Os" value="Mac Os"></v-checkbox>
        <v-checkbox v-model="selected" label="Android" value="Android"></v-checkbox>
        <v-checkbox v-model="selected" label="IOs" value="IOs"></v-checkbox>
        <v-layout><v-text-field v-model="otherPlatform" label="Прочие платформы"></v-text-field><v-spacer></v-spacer></v-layout>
        </v-form>
        <v-layout>
           <v-btn class="warning" 
        @click="trigUpload">Загрузить картинку</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="success" 
         @click="createOrder"
        :disabled="!valid || !image || loading"
        :loading="loading"
        >Создать объявление</v-btn> </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <img :src="imageSrc" v-if="imageSrc">
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
      price: '',
      image: null,
      imageSrc: '',
      selected: [],
      otherPlatform: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createOrder () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          fullDiscription: this.fullDiscription,
          price: this.price,
          image: this.image,
          selected: this.selected,
          otherPlatform: this.otherPlatform
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/buy')
          })
          .catch(() => {})
      }
    },
    trigUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }

}
</script>
<style scoped>
v-text-field{
  overflow: hidden;
}
</style>