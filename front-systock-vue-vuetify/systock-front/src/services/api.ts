import axios from "axios";
import type { IUser } from "@/types/User";


async function getUser() {
  try {
    const response = await axios.get("http://localhost:8989/users");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao buscar usuários:", error.message);
      console.error("erro:", error.response?.data || error.toJSON());
    } else {

      console.error("Erro inesperado:", error);
    }
    return [];
  }
}


async function createUser(user: IUser) {
  try {
    const response = await axios.post('http://localhost:8989/users', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      console.log('Usuário criado com sucesso!', response.data);

    } else {
      console.error('Falha ao criar usuário:', response.data);
      throw new Error('Falha ao criar usuário.');
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

async function editUser (user:IUser) {
  const identify = user.identify
  try {
    // console.log('Enviando:', identify, user);
   const response = await axios.patch(`http://localhost:8989/users/${identify}`,
    user
  )
   console.log('update sucessful', response.data);

  }catch (error ) {
   console.error(error)

  }

}

async function deleteUser (identify:number) {
  try {
   const request = await axios.delete(`http://localhost:8989/users/${identify}`)
   console.log('delete sucessful', request.data);


  }catch (error ) {
   console.error(error)

  }

}




export {getUser, createUser,editUser,deleteUser}
