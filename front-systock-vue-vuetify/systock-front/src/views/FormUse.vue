

<template>
  <div class="d-flex justify-center mt-6">
    <h2>Cadastro de Novos Usuários</h2>
  </div>
  <v-form   v-model="valid" @submit.prevent="makeUsers" >
    <v-container
    class="d-flex flex-column justify-content align-center mt-4"
     style="height: 20vh;"
    >
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="nome"
            :rules="nameRules"
            label="Nome Completo"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
          >
        <v-text-field
        v-mask="'###.###.###-##'"
        v-model="cpf"
        :counter="14"
        :rules="cpfRules"
        label="CPF"
        required
        ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            label="Senha"
            :rules="passwordRules"
            required
            type="password"
          ></v-text-field>
        </v-col>
        <div class="d-flex justify-center mt-4">
          <v-btn color="primary" class="mt-2" type="submit" :disabled="!valid">Submit</v-btn>

        </div>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {createUser} from '@/services/index'
import type { IUser } from '@/types/User';
import { mask } from 'vue-the-mask';
import router from '@/routes';

  export default defineComponent({

    directives:{mask},
    data: () => {
     return {
       valid: false,
       nome: '',
       nameRules: [
         (value:string) => {
           if (value) return true

           return 'Nome é obrigatorio.'
         }
       ],
       email: '',
       emailRules: [
         (value:string) => {
           if (value) return true

           return 'E-mail é obrigatorio.'
         },
         (value:string) => {
           if (/.+@.+\..+/.test(value)) return true

           return 'Digite um email válido'
         },
       ],
       cpf:'',
       cpfRules:[
         (value:string) => {
           if(value.length < 14) return 'Cpf precisa ter 14 digitos'
          }],
        password:'',
        passwordRules: [
         (value:string) => {
           if (value) return true

           return 'Senha é obrigatorio.'
          },
          (value:string) => {
            if(value.length < 8) return 'Senha deve possuir pelo menos 8 digitos'

          }
       ],
     };
    },
    methods: {
      async makeUsers() {
        const user: IUser = {
          name: this.nome,
          cpf: this.cpf,
          email: this.email,
          password: this.password,
    };
    try {
      await createUser(user);
      alert('Usuário criado com sucesso!');
      router.push('/');

    }catch(error) {
      console.error('Erro ao criar o usuário:', error);
      alert('Erro ao criar o usuário.CPF ou email já cadastrados');
      router.push('/');
    }
  },
}

  })
</script>
