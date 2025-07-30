import Task from "../models/Task.js";
import Project from "../models/Project.js";


// POST /api/tasks/:projectId  = Create a task under a project
export const createTask = async (req, res) => {
  try {

    const project = await Project.findById(req.params.projectId);
     const assinename = await Task.findOne(req.params.name);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to add task to this project.' });
    }
    const {
      title,
      description,
      status,
      assignee,
      deadline,
      priority,
      comments
    } = req.body;

    const createdTask = await Task.create({
      title,
      description,
      status,
      project: project._id,
      assignee: assinename.name,
      deadline,
      priority,
      comments
    });
    console.log(createdTask);
    res.status(201).json(createdTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task.' });
  }
};

// GET /api/tasks/ - Get all tasks for a specific project
export const getTasksByProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to view tasks for this project.' });
    }
    const tasks = await Task.find({ project: project._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks.' });
  }
};

// PUT /api/tasks/:taskId: -Update a single task
export const updateTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.taskId).populate('project');

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    const project = task.project;

    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this task.' });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title || task.title,
        description: req.body.description || task.description,
        status: req.body.status || task.status,
        assignee: req.body.assignee || task.assignee,
        deadline: req.body.deadline || task.deadline,
        priority: req.body.priority || task.priority,
        comments: req.body.comments || task.comments
      },
      { new: true, runValidators: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task.' });
  }
};

// GET /api/tasks - Get all tasks across all projects owned by the logged-in user
export const getAllTasks = async (req, res) => {
  try {
    // Step 1: Find all projects belonging to the logged-in user
    const userProjects = await Project.find({ user: req.user._id }).select('_id');

    // Step 2: Extract just the project IDs
    const projectIds = userProjects.map(p => p._id);

    // Step 3: Fetch tasks linked to those project IDs
    const tasks = await Task.find({ project: { $in: projectIds } });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Get all tasks error:", err);
    res.status(500).json({ message: 'Error fetching tasks.' });
  }
};

//DELETE /api/tasks/:taskId: - Delete a single task
export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.taskId).populate('project');
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    const project = task.project;
    if (!project || project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this task.' });
    }
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task.' });
  }
};