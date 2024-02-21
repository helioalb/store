# store

## Development

Install nodejs 20.10.0

tip :bulb: : use a node version manager ([nvm](https://github.com/nvm-sh/nvm) or [asdf](https://github.com/asdf-vm/asdf-nodejs))

## Backend

### Before start

#### Run docker compose to have a postgres instance ready

:warning: The docker compose is in the root of the project (it is not in the backend folder)

```shell
docker compose up -d
```

#### Create a file .env in the root of backend folder with the following content

This must be made inside of the **backend** folder.

```
echo "DATABASE_TYPE=postgres
DATABASE_URL=postgres://admin:admin@localhost/medusa
MEDUSA_ADMIN_ONBOARDING_TYPE=default
STORE_CORS=http://localhost:8000,http://localhost:7001" >> backend/.env
```

#### Run the migrations

Inside of backend folder

```shell
npx medusa migrations run
```

#### Run seed data

Inside of backend folder

```shell
npx medusa seed -f data/seed.json
```

### Starting

Inside of backend folder

```shell
npx medusa develop
```

## Frontend

Inside of frontend folder:

### Create a .env.local file

```shell
cp .env.template .env.local
```

### Run the project

```shell
npm run dev
```
