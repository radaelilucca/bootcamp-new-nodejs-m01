const express = require('express')
const {uuid, isUuid} = require('uuidv4')

const app = express()

app.use(express.json())

const projects = []

function logRequest(req, res, next){
  const {method, url} = req

  const logLabel = `Method:[${method.toUpperCase()}] URL: ${url}`

  console.time('Server log ☞ ', logLabel)  
  next()
  console.timeEnd('Server log ☞ ', logLabel)

}

function validateProjectId (req, res, next) {
  const {id} = req.params;

  if(!isUuid(id)){
    return res.status(400).json({error: 'Invalid project ID!'})
  }

  return next()
}

app.use(logRequest)
app.use('/projects/:id', validateProjectId)

app.get('/projects', (req, res) => {
  const {title, owner} = req.query;

  if(!title && !owner){
    return res.json(projects)
  }

  const filteredProjects = projects.filter(project => project.owner.includes(owner) || project.title.includes(title))

  return res.json(filteredProjects)
})

app.post('/projects', (req, res) => {
  const project = req.body;
  
  const newProject = {id: uuid(), ...project}

  projects.push(newProject)

  return res.json(newProject)
})

app.put('/projects/:id', (req, res) => {
  const {id} = req.params;

  const {title, owner} = req.body;

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return res.status(404).json({error: 'Project not found'})
  }

  const project = {id, title, owner}

  projects[projectIndex] = project
 
  return res.json(project)
})

app.delete('/projects/:id', (req, res) => {
  const {id} = req.params;

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return res.status(404).json({error: 'Project not found'})
  }
  projects.splice(id, 1)

  return res.status(204).send()
})

app.listen(3333, () => {
  console.log("🧩 Server started! Port: 3333")
})