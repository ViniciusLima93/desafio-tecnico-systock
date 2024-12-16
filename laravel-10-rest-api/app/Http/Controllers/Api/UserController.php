<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function __construct(
        protected User $repository,
    ) {

    }

    public function index()
    {
        $users = $this->repository->paginate();

        return UserResource::collection($users);
    }

    public function store(StoreUpdateUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($request->password);

        $user = $this->repository->create($data);

        return new UserResource($user);
    }

    public function show(string $id)
    {

        $user = $this->repository->findOrFail($id);

        return new UserResource($user);
    }

    public function update(StoreUpdateUserRequest $request, string $id)
    {
        $data = $request->only(['name', 'email', 'cpf']);

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $user = User::findOrFail($id);
        $user->update($data);

        return response()->json(['message' => 'Usuário atualizado com sucesso!']);
    }

    public function destroy(string $id)
    {
        $user = $this->repository->findOrFail($id);
        $user->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
