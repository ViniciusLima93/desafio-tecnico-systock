<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/routes';
import {deleteUser, getUser} from '@/services/index';
import type { IUser } from '@/types/User';

const users: IUser[] = []

export default defineComponent({
  data() {
    return {
      headers: [
        {
          align: 'start',
          key: 'name',
          sortable: false,
          title: 'Nome',
        },
        { key: 'email', title: 'Email' },
        { key: 'cpf', title: 'CPF' },
        { key: 'actions', title: '', align: 'center', sortable: false },
      ],
      users: users,
      search: '',
      selectedUser: null as IUser | null
    };
  },
  methods: {
    directToForm() {
      router.push('/createuser');
    },
    async fetchUsers() {
      try {
        const usersFromApi = await getUser();
        this.users = usersFromApi;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        this.users = [];
      }
    },
    async deleteUsers (users:IUser) {
      if(confirm(`Tem certeza que deseja excluir o usuário ${users.name}`)) {
        try {
          await deleteUser(users.identify!);
          this.fetchUsers();
          alert('Usuário excluído com sucesso!')
        }catch (error) {
          console.error('Erro ao excluir usuário:', error);
          alert('Erro ao excluir o usuário.');
        }
      }
    },
    async updateUsers (user:IUser) {
      router.push({
      path: '/updateuser',
      query: {
      identify: user.identify,
      name: user.name,
      email: user.email,
      cpf: user.cpf
    }
  });
    }
  },
  mounted() {
    this.fetchUsers();
  },
});
</script>

<template>
  <div class="d-flex justify-center mt-6">
    <h2>Lista de Usuários</h2>
  </div>
    <v-card flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table class="d-flex mt-4" item-value="id" :items="users" :search="search" :headers="headers">
      <template #item.actions="{ item }">
        <v-icon
          large
          color="primary"
          class="mr-2"
          @click="updateUsers(item)"
        >
          mdi-pencil
        </v-icon>
          <v-icon
            small
            color="red"
            @click="deleteUsers(item)"
          >
            mdi-delete
          </v-icon>

      </template>

    </v-data-table>
  </v-card>

  <v-container>
    <v-row align="center" justify="center">
      <v-col class="d-flex justify-center">
        <v-btn @click="directToForm" class="redirect-create-user" color="primary">
          Cadastrar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
