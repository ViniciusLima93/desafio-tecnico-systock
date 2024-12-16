<template>
  <div class="d-flex justify-center mt-6">
    <h2>Atualizar Usuários</h2>
  </div>
  <v-form v-model="valid" @submit.prevent="updateUser">
    <v-container class="d-flex flex-column justify-content align-center mt-4"
    style="height: 20vh;">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.name"
            :rules="nameRules"
            label="Nome Completo"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.cpf"
            label="CPF"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.password"
            label="Senha"
            type="password"
          ></v-text-field>
        </v-col>
        <div class="d-flex justify-center mt-4">
          <v-btn  color="primary" class="mt-2" type="submit">Atualizar</v-btn>

        </div>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { editUser } from '@/services/index';
import type { IUser } from '@/types/User';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    console.log('Rota atual:', route.query);


    const user = reactive<IUser>({
      identify: route.query.identify as unknown as number,
      name: route.query.name as string,
      email: route.query.email as string,
      cpf: route.query.cpf as string,
      password: '',
    });

    const nameRules = [(value: string) => !!value || 'Nome é obrigatório.'];
    const emailRules = [
      (value: string) => !!value || 'E-mail é obrigatório.',
      (value: string) => /.+@.+\..+/.test(value) || 'E-mail deve ser válido.',
    ];
    // const cpfRules = [
    //   (value: string) => !!value || 'CPF é obrigatório.',
    //   (value: string) => value.length === 11 || 'CPF deve conter 11 dígitos.',
    // ];

    const updateUser = async () => {
      try {
        await editUser(user);

        alert('Usuário atualizado com sucesso!');
        router.push('/');
      } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        alert('Erro ao atualizar o usuário.');
      }
    };

    return {
      user,
      nameRules,
      emailRules,
      valid: false,
      updateUser,
    };
  },
});
</script>
