const db = require('../data/db-config.js');


module.exports = {
    addResource,
    getResources,
    addProject,
    getProjects,
    addTask,
    getTasks,
    getById
}

function getProjects() {
    return db('projects');
}

function getResources() {
    return db('resources');
}

function getById(id) {
    let query = db('projects');
    if (id) {
      return query
        .where({ id })
        .then((project) => {
          if (project) {
            return project;
          } else {
            return null;
          }
        });
    }
}

function getTasks() {
        return db('tasks')
        .select('Projects.name as Project', 'Projects.description as ProjectDescription', 'Tasks.description as Task')
        .join('projects', 'Tasks.project_id', 'Projects.id')
}

function addProject(project) {
    return db('projects')
        .insert(project, 'id')
        .then(([id]) => getProjects())
}

function addResource(resource) {
    return db('resources')
        .insert(resource, 'id')
        .then(([id]) => getResources())
}

function addTask(task) {
    return db('tasks')
        .insert(task, 'id')
        .then(([id]) => getTasks())
}