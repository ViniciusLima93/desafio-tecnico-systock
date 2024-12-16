##Passo a passo para rodar o backend e banco do projeto


Copie o arquivo .env:

```sh
cp.env.example.env

```


Atualiza as variaveis de ambiente 

APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug


DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=postgres


Suba os containers do projeto
```sh
docker-compose up -d
```

Acesse o container:
```sh
docker-compose exec app bash
```

Instalar dependências do projeto
```sh
composer install
```

Gerar a key do projeto Laravel
```sh
php artisan key:generate
```

Acessar o projeto
[http://localhost:8989](http://localhost:8989)
