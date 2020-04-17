const express = require("express");
const Projects = require("./projects-model.js");

const router = express.Router();

// retrieving a list of projects.
router.get('/', (req, res) => {
    Projects.getProjects()
      .then(projects => {
        res.json(projects);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to get projects" });
      });
  });

// adding projects.
router.post('/', (req, res) => {
    Projects.addProject(req.body)
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Failed to post new project. "})
        })
})

// retrieving a list of resources.
router.get('/resources', (req, res) => {
  Projects.getResources()
    .then(resources => {
      res.json(resources)
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get resources."})
    })
})

// adding resources.
router.post('/resources', (req, res) => {
  Projects.addResource(req.body)
    .then(resource => {
      res.status(201).json(resource)
    })
    .catch(err => {console.log(err)})
})


// adding tasks.
router.post('/tasks', (req, res) => {
  Projects.addTask(req.body)
    .then(task => {
      res.status(201).json(task)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Unable to post new task."})
    })
})

// retrieving a list of tasks. The list of tasks should include the project name and project description.
router.get('/tasks', (req, res) => {
  Projects.getTasks()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get tasks" });
    });
});

// get by Id:
router.get('/:id', (req, res) => {
  Projects.getById(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Error retrieving project."})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Unable to get Project by id."})
    })
})

module.exports = router;