# Trabalho Individual - Gerencia de Configuracao e Evolucao de Software (2026-1)

`Aluno(a):` Letícia Resende da Silva
`Matrícula:` 211031118

Projeto baseado no mk.js, um jogo de luta em HTML5 Canvas e JavaScript com backend Node.js para partidas em rede. A aplicacao tambem possui configuracao com Docker, Docker Compose, Nginx e PostgreSQL.

## Modos de jogo

- `Basico`: um jogador ativo e um jogador inativo.
- `Multijogador`: dois jogadores ativos no mesmo computador.
- `Rede`: dois jogadores ativos conectados pelo servidor.

## Pre-requisitos

Para executar com Docker:

- Docker
- Docker Compose

Para executar comandos locais de qualidade:

- Node.js 20 ou superior
- npm

## Como subir o ambiente de desenvolvimento

O ambiente de desenvolvimento usa o arquivo `docker-compose.yml`. Ele sobe:

- `app`: servidor Node.js em modo desenvolvimento com `nodemon`;
- `db`: banco PostgreSQL;
- volumes locais para refletir alteracoes em `server/` e `game/`.

Passo a passo:

1. Acesse a raiz do projeto:

   ```bash
   cd Trabalho-Individual-GCES
   ```

2. Suba os containers de desenvolvimento:

   ```bash
   docker compose up --build
   ```

3. Aguarde o banco ficar saudavel e o servidor iniciar.

4. Abra o jogo no navegador:

   ```text
   http://localhost:55555
   ```

5. Para encerrar o ambiente:

   ```bash
   docker compose down
   ```

Se quiser remover tambem os dados do banco local:

```bash
docker compose down -v
```

## Como visualizar o ambiente de producao

O ambiente de producao usa o arquivo `docker-compose.prod.yml`. Ele sobe:

- `app`: backend Node.js usando `npm start`;
- `nginx`: servidor web que entrega os arquivos estaticos do jogo e encaminha `/socket.io/` para o backend;
- `db`: banco PostgreSQL com volume persistente.

Passo a passo:

1. Acesse a raiz do projeto:

   ```bash
   cd Trabalho-Individual-GCES
   ```

2. Suba os containers de producao:

   ```bash
   docker compose -f docker-compose.prod.yml up --build -d
   ```

3. Verifique se os containers estao em execucao:

   ```bash
   docker compose -f docker-compose.prod.yml ps
   ```

4. Abra o ambiente de producao no navegador:

   ```text
   http://localhost:8080
   ```

5. Para acompanhar os logs:

   ```bash
   docker compose -f docker-compose.prod.yml logs -f
   ```

6. Para encerrar o ambiente:

   ```bash
   docker compose -f docker-compose.prod.yml down
   ```

Se quiser remover tambem os dados persistidos do banco de producao local:

```bash
docker compose -f docker-compose.prod.yml down -v
```

## Execucao local sem Docker

Tambem e possivel abrir o modo basico ou multijogador diretamente pelo navegador:

```text
game/index.html
```

Para usar o modo em rede sem Docker, e necessario ter um PostgreSQL acessivel com as variaveis esperadas pelo servidor:

- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`

Depois, execute:

```bash
cd server
npm install
npm start
```

O servidor inicia em:

```text
http://localhost:55555
```

## Comandos uteis

Instalar dependencias da raiz:

```bash
npm install
```

Executar lint:

```bash
npm run lint
```

Validar build:

```bash
npm run build
```

Executar testes:

```bash
npm test
```

Executar testes com cobertura:

```bash
npm run test:coverage
```

## Prints das etapas funcionando

Use esta secao para registrar os prints de cada etapa do projeto em funcionamento. Salve as imagens em `docs/prints/` e substitua os caminhos abaixo pelos arquivos reais.

### 1. Containerizacao (DEV)

Elaboracao de Dockerfile para ambiente de desenvolvimento com suporte a hot-reload, com mudancas no codigo refletidas imediatamente no container.

![Containerizacao DEV](docs/prints/etapa1.png)

### 2. Docker Compose (DEV)

Configuracao de um `docker-compose.yml` que integra a aplicacao e um banco de dados Postgres, incluindo uma camada simples de persistencia no codigo.

![Docker Compose DEV](docs/prints/etapa2_parte1.png)
![Docker Compose DEV](docs/prints/etapa2_parte2.png)
![Docker Compose DEV](docs/prints/etapa2_parte3.png)
![Docker Compose DEV](docs/prints/etapa2_parte4.png)
![Docker Compose DEV](docs/prints/etapa2_parte5.png)

### 3. CI - Build & Lint

Automacao das etapas de build e lint para front-end e back-end via GitHub Actions, com falha no pipeline caso o lint encontre erros.

![CI Build e Lint](docs/prints/etapa3_parte1.png)
![CI Build e Lint](docs/prints/etapa3_parte2.png)

### 4. CI - Testes Unitarios

Implementacao de testes unitarios funcionais, com commits sequenciais demonstrando o teste quebrando no CI e passando apos a correcao.

![CI Testes Unitarios](docs/prints/etapa4_parte1.png)
![CI Testes Unitarios](docs/prints/etapa4_parte2.png)
![CI Testes Unitarios](docs/prints/etapa4_parte3.png)
![CI Testes Unitarios](docs/prints/etapa4_parte4.png)
![CI Testes Unitarios](docs/prints/etapa4_parte5.png)

### 5. CI - Testes de Fuzzing

Implementacao de testes de fuzzing para validar a resiliencia das entradas do servidor contra dados inesperados.

![CI Testes de Fuzzing](docs/prints/etapa5_parte1.png)
![CI Testes de Fuzzing](docs/prints/etapa5_parte2.png)
![CI Testes de Fuzzing](docs/prints/etapa5_parte3.png)

### 6. Seguranca - SAST e SCA

Integracao de ferramentas de analise estatica de seguranca e verificacao de vulnerabilidades em dependencias, como Snyk ou `npm audit`.

![Seguranca SAST e SCA](docs/prints/etapa6_parte1.png)
![Seguranca SAST e SCA](docs/prints/etapa6_parte2.png)
![Seguranca SAST e SCA](docs/prints/etapa6_parte3.png)

### 7. Qualidade de Codigo

Integracao completa com o SonarCloud no pipeline de CI, garantindo metricas de qualidade e cobertura minimas.

![Qualidade de Codigo](docs/prints/etapa7_parte1.png)
![Qualidade de Codigo](docs/prints/etapa7_parte2.png)
![Qualidade de Codigo](docs/prints/etapa7_parte3.png)
![Qualidade de Codigo](docs/prints/etapa7_parte4.png)
![Qualidade de Codigo](docs/prints/etapa7_parte5.png)
![Qualidade de Codigo](docs/prints/etapa7_parte6.png)
![Qualidade de Codigo](docs/prints/etapa7_parte7.png)
![Qualidade de Codigo](docs/prints/etapa7_parte8.png)

### 8. Conteinerizacao (PROD)

Elaboracao de Dockerfiles otimizados para producao, com multi-stage build baseado em Alpine e configuracao do Nginx como servidor de arquivos estaticos.

![Conteinerizacao PROD](docs/prints/etapa8_parte1.png)
![Conteinerizacao PROD](docs/prints/etapa8_parte2.png)

### 9. Infraestrutura (K8s e Terraform)

Criacao de manifestos de Kubernetes para orquestracao da aplicacao. Opcionalmente, uso de Terraform para provisionamento da infraestrutura necessaria.

![Infraestrutura K8s e Terraform](docs/prints/etapa9_parte1.png)
![Infraestrutura K8s e Terraform](docs/prints/etapa9_parte2.png)
![Infraestrutura K8s e Terraform](docs/prints/etapa9_parte3.png)
![Infraestrutura K8s e Terraform](docs/prints/etapa9_parte4.png)

### 10. CD e Seguranca de Rede

Deploy continuo com publicacao de imagens e configuracao de HTTPS via Cert Manager. O Nginx deve redirecionar a porta 80 para 443 e nao exportar outras portas para fora da rede de containers.

![CD e Seguranca de Rede](docs/prints/etapa10_parte1.png)
![CD e Seguranca de Rede](docs/prints/etapa10_parte2.png)
![CD e Seguranca de Rede](docs/prints/etapa10_parte3.png)
![CD e Seguranca de Rede](docs/prints/etapa10_parte4.png)
![CD e Seguranca de Rede](docs/prints/etapa10_parte5.png)

## Kubernetes

Os manifestos de Kubernetes ficam em `k8s/`. Consulte `k8s/README.md` para instrucoes de aplicacao no cluster.

## Licenca

Este software e distribuido sob os termos da licenca MIT.
