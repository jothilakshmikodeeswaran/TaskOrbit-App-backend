import express from "express";
import { authMiddleware } from "../utils/auth.js";
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();
// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);


export default router;