# Linkr
Um aplicativo de rede social para o compartilhamento de links. Compartilhe links, curta, e siga seus amigos!

<p align="center">  
  <img src=public/assets/demo.gif?raw=true" alt="app demo" height=350/>
</p>

Teste à vontade no seguinte link:  https://linkr-front-app.vercel.app

## Sobre

Este é um aplicativo de uma aplicação web com interface completa para o compartilhamento de links. Todos os conteúdos são persistidas em banco de dados com o uso de uma API cujo repositório está indicado mais adiante. Temos as seguintes opções para o usuário:

- Sign up
- Login
- Postagem de links com descrição e possibilidade de uso de hashtags
- Deleção e edição dos próprios posts
- Curtir e comentar posts
- Visualização de "trending" para as hashtags mais utilizadas
- Opção de seguir e visualizar perfis de outros usuários.

Dentre as features planejadas para o app, temos:
- Possibilidade de "recompartilhar" posts (o famoso RT do twitter)
- Integração de tests para o front

## Tecnologias
Foram utilizadas as seguintes ferramentas para a construção deste app:<br>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Como rodar

1. Clone este repositório
2. Clone o repositório de back-end em https://github.com/phebueno/linkr-front
3. Siga as intruções para preparar o back-end em https://github.com/wesleymichael/linkr-back
4. Instale dependências
```bash
npm i
```
5. Crie um .env com a variável REACT_APP_API_URL e atribuia o domínio onde a API estará rodando
6. Rode o front-end com
```bash
npm start
```
7. Opcionalmente, monte uma build nova do projeto com
```bash
npm run build
```
8. Finalmente, acesse http://localhost:3000 no seu navegador favorito!
