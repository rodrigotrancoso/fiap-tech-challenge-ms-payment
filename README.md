# 💰 FIAP Tech Challenge - Microserviço de Pagamentos

Este projeto é um microsserviço desenvolvido em **Node.js** com **Express**, utilizando **AWS RDS PostgreSQL** para armazenar pagamentos e o **SDK do MercadoPago** para gerar QR Codes de pagamento. Ele faz parte do FIAP Tech Challenge e gerencia o fluxo de pagamentos no sistema distribuído.

---

## 🚀 Tecnologias Utilizadas
- **Node.js** + **Express** - API backend
- **AWS RDS PostgreSQL** - Banco de dados relacional
- **MercadoPago SDK** - Integração com pagamentos via PIX
- **Docker** - Containerização do microsserviço
- **Kubernetes** - Orquestração de containers
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Testes unitários e de integração

---

## 📂 Estrutura do Projeto
```
📁 fiap-tech-challenge-ms-payment
├── 📁 docs
│   ├── 📜 swagger-payment-updated.json  # Arquivo OpenAPI (Swagger)
├── 📜 .babelrc
├── 📜 .gitignore
├── 📜 Dockerfile
├── 📜 README.md
├── 📜 index.js
├── 📜 jest.config.js
├── 📜 package.json
├── 📁 config
│   ├── 📜 database.js  # Configuração do PostgreSQL
├── 📁 src
│   ├── 📁 controllers
│   │   ├── 📜 payment.controller.js
│   ├── 📁 models
│   │   ├── 📜 payment.model.js
│   ├── 📁 routes
│   │   ├── 📜 payment.routes.js
│   ├── 📁 services
│   │   ├── 📜 payment.service.js
│   │   ├── 📜 mercadopago.service.js  # Integração com MercadoPago
├── 📁 test
│   ├── 📜 controllers/payment.controller.test.js
│   ├── 📜 services/payment.service.test.js
├── 📁 k8s
│   ├── 📜 ms-payment-deployment.yaml  # Deployment no Kubernetes
│   ├── 📜 hpa.yaml  # Configuração de AutoScaling
├── 📁 .github/workflows
│   ├── 📜 pipeline-ci.yml  # CI - Testes automatizados
│   ├── 📜 pipeline-cd.yml  # CD - Deploy no Kubernetes
```

---

## 🔧 Configuração e Uso

### 1️⃣ **Instalar Dependências**
```sh
npm install
```

### 2️⃣ **Configurar Banco de Dados**
O banco de dados usa **AWS RDS PostgreSQL**. Defina as variáveis de ambiente no `.env`:
```ini
DB_HOST=<host_do_rds>
DB_PORT=5432
DB_USER=<seu_usuario>
DB_PASSWORD=<sua_senha>
DB_NAME=payment_db
MERCADOPAGO_ACCESS_TOKEN=<seu_token_do_mercadopago>
```

### 3️⃣ **Rodar o Servidor**
```sh
npm start
```
O servidor iniciará na porta `3001` (ou outra definida na variável `PORT`).

### 4️⃣ **Executar Testes**
```sh
npm test
```

---

## 📦 Docker
### **1️⃣ Construir a Imagem**
```sh
docker build -t ms-payment .
```

### **2️⃣ Rodar o Container**
```sh
docker run -p 3001:3001 --env-file .env ms-payment
```

---

## 🚢 Kubernetes
### **1️⃣ Aplicar os Manifests**
```sh
kubectl apply -f k8s/ms-payment-deployment.yaml
kubectl apply -f k8s/hpa.yaml
```

---

## 🔄 CI/CD com GitHub Actions
Este projeto utiliza **GitHub Actions** para automatizar **testes** e **deploys**:
- `pipeline-ci.yml` → Executa testes automáticos
- `pipeline-cd.yml` → Realiza deploy no Kubernetes

---

## 📜 Documentação OpenAPI (Swagger)

<details>
  <summary>📖 Clique para visualizar o Swagger</summary>

### 🔹 **Endpoints da API**
- `POST /api/v1/payments` → Cria um novo pagamento e retorna um QR Code para pagamento.
- `GET /api/v1/payments` → Lista todos os pagamentos.
- `GET /api/v1/payments/{id}` → Retorna um pagamento pelo ID.
- `PATCH /api/v1/payments/{id}` → Atualiza **somente** o status de um pagamento.

### 🔹 **Baixar Swagger JSON**
[Download swagger-payment-updated.json](./docs/swagger-payment-updated.json)

</details>

---

## 📝 Licença
Este projeto está sob a **MIT License**.

