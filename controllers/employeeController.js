import Employee from "../models/Employee.js";

// Create a new employee
export const createEmployee = async (req, res) => {
    try {
    const {
      name,
      email,
      role,
      sex,
      joinedAt
    } = req.body;
    const newEmployee= await Employee.create({
       name,
      email,
      role,
      sex,
      joinedAt,
      user: req.user._id
    });
    res.status(201).json(newEmployee);

  } catch (err) {
    res.status(500).json({ message: "Error creating project." });
  }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ error: "Employee not found" });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an employee by ID
export const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ error: "Employee not found" });
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete an employee by ID
export const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ error: "Employee not found" });
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};