<template>
<v-container fluid fill-height>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6 lg4>  
      <v-card>
        <v-layout row wrap>
        <v-flex xs12 md4>
      <v-tooltip right v-if="!avatarSrc">
      <img  class='pulse' src="https://firebasestorage.googleapis.com/v0/b/soft-planet.appspot.com/o/user.png?alt=media&token=7b08396f-755e-46f6-92b1-14f4f6213991"  slot="activator" alt="avatar" @click="trigUpload">
      
      <input 
          ref="fileInput" 
          type="file" 
          style="display:none" 
          accept="image/*"
          @change="onFileChange"
          >
    <span>Нажмите для загрузки аватара</span>
      </v-tooltip><img :src=avatarSrc  v-else>
      </v-flex>
      <v-flex xs12 md8>
      <v-text-field
          id="nickname"
          name="nickname"
          label="Введите свой никнейм"
          v-model="nickname"
        ></v-text-field> 
        <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="DOB"
        persistent
        lazy
        full-width
        width="290px"

        >
        <v-text-field
          slot="activator"
          label="Введите дату своего рождения"
          prepend-icon="event"
          readonly
          v-model="DOB"
        ></v-text-field>
        <v-date-picker 
        scrollable
        dark
        locale="ru"        
        v-model="DOB"
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Закрыть  </v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(DOB)">OK</v-btn>
        </v-date-picker>
      </v-dialog> 
      <v-select
          v-model="skills"
          :items="items"
          label="Введите свои особые навыки"
          chips
          tags
        >
          <template slot="selection" slot-scope="data">
            <v-chip
            >
              <v-avatar class="accent">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-select>
        </v-flex> 
      </v-layout>
      
      </v-card>
    </v-flex>
    
      
   
  </v-layout>
</v-container>

</template>

<script>
export default{
  data () {
    return {
      nickname: '',
      DOB: '',
      modal: false,
      skills: [],
      avatar: null,
      avatarSrc: '',
      items: [
        'Программирование',
        'Дизайн',
        'Javascript',
        'C#',
        'C++',
        'C'
      ]
    }
  },
  methods: {
    trigUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.avatarSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.avatar = file
    }
  }
}
</script>





<style scoped>
img{
  min-width: 200px;
  max-width: 250px;
  background-color: rgb(250, 250, 250);
  cursor: url("https://firebasestorage.googleapis.com/v0/b/soft-planet.appspot.com/o/cursor%2FUntitled-1.png?alt=media&token=f3a9c5d6-e533-4510-867c-17ba0d996ece"), auto;
  transition: all 1s ease; 
  border-radius:50%;
  transform: translateX(-50%);
}

.pulse:hover{
    filter: brightness(40%);
    animation: pulse 1s infinite;
    box-sizing: content-box;
    position: relative;
  }

@keyframes pulse {
  0% {
  transform: scale(0.9) translateX(-50%);
  }

  70% {
    transform: scale(1) translateX(-50%);
  }

  100%{ 
      transform: scale(0.9) translateX(-50%);
  }
}

@media screen and (max-width: 600px){
  img{
    margin-left:50%; 
  }
}

</style>