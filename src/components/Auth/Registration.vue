<template>
<v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark>
                <v-toolbar-title>Регистрация</v-toolbar-title> 
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model.trim="valid" validation>
                  <v-text-field prepend-icon="person" name="E-mail" label="E-mail" type="text"
                  v-model="email"
                  :rules="emailRules"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Пароль" type="password"
                  v-model="password"
                  :counter="14"
                  :rules="passwordRules"
                  ></v-text-field>
                  <v-text-field id="confirmPassword" prepend-icon="lock" name="password" label="Подтвердите пароль" type="password"
                  v-model="confirmPassword"
                  :counter="14"
                  :rules="confirmPasswordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                @click="onSubmit"
                :loading="loading"
                :disabled="!valid || loading"
                >Создать аккаунт</v-btn>
              </v-card-actions>
            </v-card>
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
      valid: false,
      confirmPassword: '',
      emailRules: [
        v => !!v || 'Требуется электронная почта',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail Должен быть верным'],
      passwordRules: [
        v => !!v || 'Требуется ввести пароль',
        v => (v && v.length >= 5 && v.length <= 14) || 'Длинна пароля должна быть от 5 до 14 символов'],
      confirmPasswordRules: [
        v => !!v || 'Требуется подтвердить пароль',
        v => v === this.password || 'Пароли должны совпадать']
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
          this.$router.push(this.$route.fullPath + '/other')
        })
        .catch(() => {})
      }
    }
  }
}
</script>
<style scoped>
</style>