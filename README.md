<h1 align="center">Web Scrapper API - Bora Codar</h1>

<p align="center">
  <a href="#-teste">Teste</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-direitos">Direitos</a>
</p>

---

## 🖱 Teste

Projeto hospedado na [Heroku](https://www.heroku.com/), você pode testar aqui:

> https://api-bora-codar.herokuapp.com/api/episodes

---

## ❔ Sobre

Esta é uma API que captura os dados do podcat [Bora Codar](https://codar.app/bora.html) fazendo um web scraping e retornando os dados em json.

---

## ⚙ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.dev/)
- [Puppeteer](https://pptr.dev/)
- [Express](https://expressjs.com/pt-br/)

**Buildpacks**

- [puppeteer-heroku-buildpack](https://github.com/jontewks/puppeteer-heroku-buildpack)
- [heroku/nodejs](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)

**Banco de Dados**

- [MongoDB](https://www.mongodb.com/pt-br)

---

## 🚏 Endpoints

Lista todos os episódios:

```http
GET /api/episodes
```

#### Retorno [Array]

```json
[
  {
    "_id": "60e28888c8d60518b84c55f3",
    "file": {
      "url": "https://anchor.fm/s/4de363fc/podcast/play/31437724/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-3-14%2F32cfac7e-c3b8-b505-a50c-9201b8aa2702.mp3",
      "duration": 1643.352
    },
    "thumbnail": "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo400/12967479/12967479-1613936504355-207ab4a0afca4.jpg",
    "title": "#11 Senioridade",
    "slug": "11-senioridade",
    "description": "<p>E no episódio de hoje, convidamos o Paulo Reis, mais conhecido como Bugginho Developer para falar sobre Senioridade!&nbsp;</p>\n<p><br></p>",
    "published_at": "April 26, 2021"
  }
  // demais episódios...
]
```

Dados de um episódio:

```http
GET /api/episodes/:slug
```

#### Retorno [Object]

```json
{
  "_id": "60e28888c8d60518b84c55f3",
  "file": {
    "url": "https://anchor.fm/s/4de363fc/podcast/play/31437724/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-3-14%2F32cfac7e-c3b8-b505-a50c-9201b8aa2702.mp3",
    "duration": 1643.352
  },
  "thumbnail": "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo400/12967479/12967479-1613936504355-207ab4a0afca4.jpg",
  "title": "#11 Senioridade",
  "slug": "11-senioridade",
  "description": "<p>E no episódio de hoje, convidamos o Paulo Reis, mais conhecido como Bugginho Developer para falar sobre Senioridade!&nbsp;</p>\n<p><br></p>",
  "published_at": "April 26, 2021"
}
```

---

## 📝 Direitos

Todos os direitos dos dados utilizados e retornados na API são de direiito do [Bora Codar](https://github.com/devssa/bora-codar/issues)

---

<p align="center">Feito com 💚 por <a href="https://www.linkedin.com/in/arimariojesus/" target="_blank">Arimário Jesus</a></p>
