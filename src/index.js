const express = require('express')

const app = express()

app.use(express.json())

/**
 * Métodos HTTP:
 * 
 * GET: Buscar infos do back-end;
 * POST: Criar uma info no back-end;
 * PUT/PATCH: Alterar uma info no back-end;
 * DELETE: Deletar uma info do back-end;/
 *
 */

 /**
  * Tipos de parametros:
  * 
  * Query Params: Principalmente pra filtros e paginação;
  * Route Params: Identificar recursos na hora de deletar ou atualizar;
  * Request Body: Conteúdo pra criar ou editar um recurso - JSON;
  */

app.get('/projects', (req, res) => {
  const {title, owner} = req.query;

  // console.table({title, owner})

  return res.json([
    'Projeto 01',
    'Projeto 02'
  ])
})

app.post('/projects', (req, res) => {
  const {title, owner} = req.body;
  console.table({title, owner})
  return res.json([
    'Projeto 01',
    'Projeto 02',
    'Projeto 03'
  ])
})

app.put('/projects/:id', (req, res) => {
  const {id} = req.params;
  const {title, owner} = req.body;
  console.table({title, owner})
 
  return res.json([
    'Projeto 01',
    'Projeto 02',
    'Projeto 03'
  ])
})

app.delete('/projects/:id', (req, res) => {
  return res.json([
    'Projeto 01',
    'Projeto 02',
    'Projeto 03'
  ])
})

app.listen(3333, () => {
  console.log("🧩 Server started! Port: 3333")
})