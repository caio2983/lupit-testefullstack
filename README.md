<h1 align="center">Teste FullStack Lupit-io</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
</p>

<p align="center">
  Teste técnico fullstack da Lupit.io, em que desenvolvi um dashboard interativo para gerenciamento de jogadores e times.<br />
  O frontend foi feito com Next.js e se comunica com um backend em NestJS. Usei PostgreSQL como banco de dados, Prisma como ORM, Cloudinary para upload de imagens e Docker para containerização dos serviços.
</p>

# Inicialização do Projeto com Docker


```bash
docker-compose up -d
```

Migration para inicializar o banco de dados com os models Team e Player

```bash
cd backend
docker exec -it fullstack-dashboard-backend-1 npx prisma migrate dev --name init
```
Depois da inicialização do server : fazer o seeding inicial com o comando em /backend
```bash
docker exec -it fullstack-dashboard-backend-1 npx ts-node src/prisma/seed.ts
```

Acessar o frontend em
```bash
http://localhost:3000/
```


<h2 align="center">Layout 1: Dashboard</h2>
<p>
  Página onde o usuário visualiza cards de indicadores (KPIs), cards individuais de jogadores e times e um gráfico de barras comparando a quantidade de jogadores por time.
</p>

<p>
  Optei por construir o gráfico manualmente, sem utilizar bibliotecas de terceiros ,apenas com HTML e CSS puros.
  Eu usei o número de jogadores de cada time para obter uma altura em porcentagem normalizada em relação ao valor 200 ( máximo valor do eixo y no gráfico ).
  Ou seja, um time com 200 jogadores acaba com altura 100%, e a barra azul referente a ele termina na linha cinza horizontal que parte do 200, no eixo y.
</p>
<img width="1872" height="897" alt="lupit01" src="https://github.com/user-attachments/assets/a7c0ad3e-7cc8-4930-980a-a8702246f138" />
<img width="1810" height="412" alt="image" src="https://github.com/user-attachments/assets/579fe52f-81b3-437a-b9d2-e2b928259724" />

<h2 align="center">Layout 2: Times</h2>
<p>
  Página onde o usuário visualiza a lista de times criados.
  A página precisa mostrar a quantidade de jogadores dentro de cada time. 
</p>

<p>
  Para isso, dentro da função getAllTeams do frontend, eu decidi chamar a função getAllPlayers , que retorna todos os jogadores
  cadastrados, e depois contar o número de jogadores que têm a prop team_id igual à prop id de Team. O resultado de getAllTeams é do tipo TeamWithPlayerCount[] , sendo TeamWithPlayerCount uma interface que extende 
  Team e adiciona a prop numberOfPlayers
</p>

<p>O botão de excluir time dispara um Sweet Alert</p>

<img width="1873" height="805" alt="image" src="https://github.com/user-attachments/assets/debb40df-bd75-492f-ba64-8bc179ce66aa" />
<img width="681" height="436" alt="image" src="https://github.com/user-attachments/assets/49a1d0c4-546c-4737-a968-ce404a4942f2" />


<h2 align="center">Layout 3: Perfil de times</h2>
<p>
  Página onde o usuário visualiza um time específico e a lista de jogadores pertencentes a ele.
</p>

<img width="1877" height="908" alt="lupit-team" src="https://github.com/user-attachments/assets/4cad712c-8db6-4237-8453-01b9d7729117" />

<h2 align="center">Layout 4: Edição / Adição de times</h2>
<p>
  Páginas onde o usuário consegue adicionar ou editar um time.
</p>

<img width="1886" height="836" alt="image" src="https://github.com/user-attachments/assets/15b8edfa-676c-44f9-ade1-7af88ed77571" />
<img width="1897" height="827" alt="image" src="https://github.com/user-attachments/assets/b93d974c-d65a-4889-b6ea-09a2196b48bc" />

<h2 align="center">Layout 5: Jogadores</h2>
<p>Página com uma lista de todos os jogadores.</p>

<img width="1882" height="843" alt="image" src="https://github.com/user-attachments/assets/d7d1a930-4f9c-4002-9fbc-d6941ff7e7db" />

<h2 align="center">Backend</h2>
<p>O projeto foi desenvolvido com NestJS, utilizando Prisma para a comunicação com o banco de dados Postgres.</p>

<p>Para popular o sistema com dados iniciais, usei um seed que pedi para o ChatGPT escrever. Ele cria 400 jogadores automaticamente e os distribui aleatoriamente entre os times de ID 1 a 5.</p>

<p>A aplicação é dividida em dois módulos principais: player e team, cada um responsável por suas respectivas rotas, regras de negócio e integração com o banco.</p>

<h2 align="center">Principais Dificuldades</h2>
<p align="center">Aqui estão os pontos em que enfrentei mais desafios e, consequentemente, onde tive maior evolução durante o projeto.</p>

<h3>1 : Prisma</h3>
<p>Mesmo já tendo usado o Prisma antes, eu não lembrava dos detalhes. Reaprendi como montar os schemas, fazer as configurações iniciais, rodar as migrations e entender como executar o seed inicial.</p>

<h3>2 :Sistema de rotas e Context API do NextJS</h3>
<p>Tive certa dificuldade para entender como fazer com que diferentes páginas compartilhassem o mesmo layout e, ao mesmo tempo, garantir que apenas os componentes client fossem envolvidos pelo context. Um exemplo disso foi quando precisei que um componente server pai envolvesse um componente client com um contexto de Player ou Team.</p>

<h3>3: TypeScript e envio de parâmetros para o backend</h3>
<p>Uma das dificuldades foi entender como enviar corretamente as variáveis para o backend e também como tipá-las de forma adequada no context e em outros pontos do frontend.</p>

<h3>4 : Docker</h3>
<p>
<p>Usar Docker no projeto foi minha maior dificuldade. Enfrentei desafios para aprender a inicializar os comandos certos em cada container e, principalmente, para entender que os Server Components do Next.js, que rodam dentro do container Docker, acessam o backend pelo endereço <code>http://backend:3001</code>, enquanto os Client Components, que rodam no navegador, acessam o backend pelo endereço <code>http://localhost:3001</code>.
Nas próximas vezes em que eu usar o Docker, entender esse ponto desde o começo do projeto fará com que eu crie um código mais limpo e organizado.
</p>








