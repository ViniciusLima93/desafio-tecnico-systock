import {createRouter, createWebHistory} from 'vue-router';

import FormUse from '@/views/FormUse.vue';

import TableUsers from '@/components/TableUsers.vue';
import UpdatesUser from '@/views/UpdatesUser.vue';

const routes = [

  {path: '/',name:'TableUsers', component:TableUsers},

  {path: '/createuser', name:'FormUsers', component:FormUse},

  {path: '/updateuser', name:'UpdateUsers', component:UpdatesUser}

]

const router = createRouter({

  history:createWebHistory(),

  routes
})

export default router;
