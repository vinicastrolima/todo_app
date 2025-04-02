# 📋 ToDoApp — Desafio Técnico Full Stack

Aplicação web para gerenciamento de tarefas (To-Do List), com autenticação de usuários, CRUD completo, filtro por status, responsividade e consumo de API externa para citações motivacionais.

Desenvolvido com React, Laravel, PostgreSQL e Docker.

---

## ✅ Tecnologias Utilizadas

- **Frontend:** React (Vite, Bootstrap)
- **Backend:** Laravel 9 (PHP 7.4)
- **Banco de Dados:** PostgreSQL
- **Ambiente:** Docker + Docker Compose

---

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/vinicastrolima/todo_app.git
cd todo_app
```

### 2. Suba os containers com Docker

```bash
docker-compose up -d --build
```

Isso irá subir os containers:

- `laravel_app` (Laravel + PHP)
- `postgres_db` (PostgreSQL)
- `nginx_web` (Nginx na porta 8000)
- `react_frontend` (React na porta 5173)

### 3. Configure o Laravel

Entre no container:

```bash
docker exec -it laravel_app bash
```

Execute os comandos:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
exit
```

### 4. Acesse a aplicação

- Frontend (React): [http://localhost:5173](http://localhost:5173)
- Backend (API Laravel): [http://localhost:8000](http://localhost:8000)

---

## 🔐 Banco de Dados

As variáveis já estão configuradas no `.env`:

```ini
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=tododb
DB_USERNAME=postgres
DB_PASSWORD=secret
```

---

## ✅ Funcionalidades

- Registro e login de usuários
- Autenticação com Laravel Sanctum
- CRUD de tarefas (criar, editar, excluir, listar)
- Marcar como concluída ou pendente
- Filtro por status (Todos | Pendentes | Concluídas)
- Interface responsiva (Bootstrap)
- Exibição de citação motivacional aleatória
- Logout funcional
- Loading durante ações
- Proteção de rota do Dashboard
- Projeto containerizado via Docker

---

## 🗂️ Estrutura de Pastas

```
todoapp/
├── backend/         # Laravel
├── frontend/        # React
├── docker/          # Configurações do Docker (nginx, php)
├── docker-compose.yml
```

---

