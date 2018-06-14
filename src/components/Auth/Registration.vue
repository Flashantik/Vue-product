<template>
<v-container fluid fill-height>
   <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 >
       <v-stepper v-model="step" vertical light v-if="!loading">
    <v-stepper-step :complete="step > 1" step="1">
     Введите свои данные которые потребуются в следующем при входе в ваш аккаунт
      <small>Не валидные E-mail приняты не будут</small>
    </v-stepper-step>
    <v-stepper-content step="1" class="elevation-12">
            <v-card >
              <v-toolbar dark>
                <v-toolbar-title>Регистрация</v-toolbar-title> 
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model.trim="valid" validation>
                  <v-text-field 
                  prepend-icon="person" 
                  name="E-mail" 
                  label="E-mail" 
                  type="text"
                  v-model="email"
                  :rules="emailRules"></v-text-field>
                  <v-text-field id="password" 
                  prepend-icon="lock" 
                  name="password"
                  label="Пароль"
                  :type="glaz ? 'text' : 'password' "
                  :append-icon="glaz ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (glaz = !glaz)"
                  v-model="password"
                  :counter="14"
                  :rules="passwordRules"
                  >
                  </v-text-field>
                  <v-text-field id="confirmPassword" 
                  prepend-icon="lock" 
                  name="password" 
                  label="Подтвердите пароль"
                  v-model="confirmPassword"
                  :counter="14"
                  :rules="confirmPasswordRules"
                  :append-icon="glaz2 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (glaz2 = !glaz2)"
                  :type="glaz2 ? 'text' : 'password'"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  @click="step = 2"
                  :disabled="!valid"
                >Продолжить</v-btn>
              </v-card-actions>
            </v-card>
    </v-stepper-content>
    <v-stepper-step :complete="step > 2" step="2">Введите данные о себе
       <small>Данные являются полностью конфиденицальными, мы не рассылаем рекламу</small>
    </v-stepper-step>
    <v-stepper-content step="2" class="elevation-12">
      <v-card>
        <v-form ref="form" v-model.trim="valid2" validation>
      <v-toolbar dark>
                <v-toolbar-title>Данные аккаунта</v-toolbar-title> 
              </v-toolbar>
        <v-layout row wrap>
        <v-flex xs12 md4 class="flexis">
      <v-tooltip right v-if="!avatarSrc">
      <img  class='pulse' src="https://firebasestorage.googleapis.com/v0/b/soft-planet.appspot.com/o/user.png?alt=media&token=7b08396f-755e-46f6-92b1-14f4f6213991"
      slot="activator" 
      alt="avatar" 
      @click="trigUpload">
      
        <input 
          ref="fileInput" 
          type="file" 
          style="display:none" 
          accept="image/*"
          @change="onFileChange"
          >
        <span>Нажмите для загрузки аватара</span>
          </v-tooltip>
          <img :src=avatarSrc  v-else>
          </v-flex>
          <v-flex xs12 md8>
          <v-text-field
              id="nickname"
              name="nickname"
              label="Введите свой никнейм"
              v-model="nickname"
              :rules="[v => !!v || 'Требуется ввести никнейм']"
            ></v-text-field> 
             <v-text-field
              id="tel"
              name="tel"
              label="Введите номер телефона"
              v-model="tel"
              :mask="'(###) ## - ### - ## - ##'"
            ></v-text-field> 
          <v-select
              v-model="skills"
              :items="items"
              label="Введите свои особые навыки"
              :rules="(v) => !!v || 'Требуется ввести особые навыки'"
              required
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
      
      <v-spacer></v-spacer><v-btn 
      @click.native="step = 3"
      :disabled="!valid2"
      >Продолжить</v-btn>
      </v-form>
      </v-card>
    </v-stepper-content>
    <v-stepper-step :complete="step > 3" step="3">Select an ad format and name ad unit</v-stepper-step>
    <v-stepper-content step="3" class="elevation-12">
      <v-card> 
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
          <v-btn flat color="primary" @click="modal = false">Закрыть</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(DOB)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
       <v-select
          :items="country"
          v-model="myContry"
          label="Выберите страну"
          autocomplete
        ></v-select>
         <v-btn 
          @click="onSubmit"
          :loading="loading"
          :disabled="!valid || loading"
          color="success"
          >Зарегистрироваться</v-btn>
      </v-card>
    </v-stepper-content>
  </v-stepper>
  <app-loader v-else></app-loader>
</v-flex>
</v-layout>
</v-container>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      myContry: '',
      confirmPassword: '',
      DOB: '',
      modal: false,
      nickname: '',
      skills: [],
      tel: '',
      avatar: null,
      avatarSrc: '',
      items: [
        'Программирование',
        'Дизайн',
        'Javascript',
        'C#',
        'C++',
        'C'
      ],

      emailRules: [
        v => !!v || 'Требуется электронная почта',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail Должен быть верным'],
      passwordRules: [
        v => !!v || 'Требуется ввести пароль',
        v => (v && v.length >= 5 && v.length <= 14) || 'Длинна пароля должна быть от 5 до 14 символов'],
      confirmPasswordRules: [
        v => !!v || 'Требуется подтвердить пароль',
        v => v === this.password || 'Пароли должны совпадать'],
      country: ['Афганистан', 'Албания', 'Алжир', 'Андорра', 'Ангола', 'Ангилья', 'Антигуа и ампир', 'Барбуда', 'Аргентина', 'Армения', 'Аруба', 'Австралия', 'Австрия', 'Азербайджан', 'Багамские острова', 'Бахрейн', 'Бангладеш', 'Белиз', 'Бенин', 'Бермудские острова', 'Бутан', 'Боливия', 'Босния и амфибия', 'Брундия', 'Ботсвана', 'Бразилия', 'Британские Виргинские острова', 'Бруней', 'Болгария', 'Буркина-Фасо', 'Бурунди', 'Камбоджа', 'Камерун', 'Кабо-Верде', 'Каймановы острова', 'Чад', 'Чили', 'Китай', 'Колумбия', 'Конго', 'Острова Кука', 'Коста-Рика', 'Беларусь', 'Кот-д Ивуар', 'Хорватия', 'Круизный корабль', 'Кипр', 'Чехия', 'Дания', 'Джибути', 'Доминика', 'Доминиканская Республика', 'Эквадор', 'Египет', 'Сальвадор', 'Экваториальная Гвинея', 'Фиджи', 'Финляндия', 'Французская Полинезия', 'Французская Вест-Индия', 'Габон', 'Гамбия', 'Грузия', 'Германия', 'Гана', 'Россия', 'Ураина', 'Гибралтар', 'Греция', 'Гренландия', 'Гренада', 'Гуам', 'Гватемала', 'Гернси', 'Гвинея', 'Гвинея-Бисау', 'Гайана', 'Гаити', 'Гондурас', 'Гонконг', 'Венгрия', 'Исландия', 'Индия', 'Индонезия', 'Иран', 'Ирак', 'Ирландия', 'Остров Мэн', 'Израиль', 'Италия', 'Ямайка', 'Япония', 'Джерси', 'Иордания', 'Казахстан', 'Кения', 'Кувейт', 'Кыргызская Республика', 'Лаос', 'Латвия', 'Ливан', 'Лесот', 'Либерия', 'Ливия', 'Лихтенштейн', 'Литва', 'Люксембург', 'Макао', 'Македония', 'Мадагаскар', 'Малави', 'Малайзия', 'Мальдивы', 'Мальта', 'Мавритания', 'Маврикий', 'Мексика', 'Молдова', 'Монако', 'Монголия', 'Черногория', 'Монтсеррат', 'Марокко', 'Мозамбик', 'Намибия', 'Непал', 'Нидерланды', 'Нидерландские Антильские острова', 'Новая Каледония', 'Новая Зеландия', 'Никарагуа', ' Нигер', 'Нигерия', 'Норвегия', 'Оман', 'Пакистан', 'Палестина', 'Панама', 'Папуа-Новая Гвинея', 'Парагвай', 'Перу', 'Филиппины', 'Польша', 'Португалия', 'Пуэрто-Рико', 'Катар', 'Руанда', 'Сен-Пьер ', 'Сенегал', 'Сейшельские острова', 'Сьерра-Леоне', 'Сингапур', 'Словакия', 'Словения', 'Сьерра-Леоне', 'Сьерра-Леоне', 'Сальвадор', 'Сан-Марино', 'Спутник', 'Саудовская Аравия', 'Южная Африка', 'Южная Корея', 'Испания', 'Шри-Ланка', 'Сент-Китс и Амп. Невис ', ' Сент-Люсия ', ' Сент-Винсент ', ' Св. Люсия', 'Судан', 'Суринам', 'Свазиленд', 'Швеция', 'Швейцария', 'Сирия', 'Тайвань', 'Таджикистан', 'Танзания', 'Таиланд', 'Тимор', 'Того', 'Тонга', 'Тринидад ', 'Тобаго', 'Тунис', 'Турция', 'Туркменистан', 'Турки и ампер; Кайкос ', ' Уганда ', ' Украина ', ' Объединенные Арабские Эмираты ', ' Соединенное Королевство ', ' Соединенные Штаты ', ' Уругвай ', ' Узбекистан ', ' Венесуэла ', ' Вьетнам ', ' Виргинские острова (США) ', 'Йемен', 'Замбия', 'Зимбабве'],
      glaz: false,
      glaz2: false,
      valid: false,
      valid2: false,
      valid3: false,
      step: 2                       // Переменная счетчик
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
        .then(() => {
          this.$router.push('/')
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
        this.avatarSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.avatar = file
    }
  }
}
</script>


<style scoped>
.flexis{
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}
img{
  min-width: 150px;
  max-width: 160px;
  background-color: rgb(250, 250, 250);
  cursor: url("https://firebasestorage.googleapis.com/v0/b/soft-planet.appspot.com/o/cursor%2FUntitled-1.png?alt=media&token=f3a9c5d6-e533-4510-867c-17ba0d996ece"), auto;
  transition: all 1s ease; 
  border-radius:50%;
}
.pulse:hover{
    filter: brightness(40%);
    animation: pulse 1s infinite;
    box-sizing: content-box;
    position: relative;
  }

@keyframes pulse {
  0% {
  transform: scale(1);
  }

  70% {
    transform: scale(0.9) ;
  }

  100%{ 
      transform: scale(1);
  }
}
</style>