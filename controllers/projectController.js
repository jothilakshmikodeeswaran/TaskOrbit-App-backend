import Project from "../models/Project.js";



// POST /api/project - Create a new project
export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      progress,
      deadline
    } = req.body;
    const newProject = await Project.create({
      name,
      description,
      status,
      progress,
      deadline,
      user: req.user._id
    });
    res.status(201).json(newProject);

  } catch (err) {
    res.status(500).json({ message: "Error creating project." });
  }
};

// GET /api/projects - Get all project for the logged-in user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects." });
  }
};


// GET /api/projects - Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || project.user.toString() !== req.user._id.toString()) //.populate('user', 'username');
    {
      return res.status(403).json({ message: "Unauthorized or not found." });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project." });
  }
};

// PUT/api/projects/:id - Update a single project by ID
export const updateProject = async (req, res) => {
     try {
      const project = await Project.findById(req.params.id);

      if (!project)
        { 
          return res.status(404).json({ message: 'Project not found.' });
        }

      if (project.user.toString() !== req.user._id.toString())
      {
        return res.status(403).json({ message: 'Unauthorized to update this project.' });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name || project.name,
          description: req.body.description || project.description,
          status: req.body.status || project.status,
          progress: req.body.progress || project.progress,
          deadline: req.body.deadline || project.deadline,
        },
        { new: true, runValidators: true }
      );

      res.json(updatedProject);
    } catch (err) {
      res.status(500).json({ message: 'Error updating project.' });
    }
};

export const deleteProject = async (req, res) => {
    try {
      const deleteProject = await Project.findByIdAndDelete(req.params.id);
      if (!deleteProject) {
        return res.status(404).json({ message: 'Project not found.' });
      }
      // Authorization check
      if (!deleteProject.user.equals(req.user._id)) {
        return res.status(403).json({ message: 'Unauthorized to delete this project.' });
      }
      res.json({ message: 'Project deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting project.' });
    }
};