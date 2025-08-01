import express from "express";
import cloudinary from "../config/cloudinary.js";//img
import multer from "multer";//img
import upload from "../middleware/upload.js";
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

// router.post("/upload-profilepic", upload.single("profilepic"), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "employee-profiles",
//     });

//     res.json({ imageUrl: result.secure_url });
//   } catch (err) {
//     console.error("Cloudinary error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });



router.post("/upload-profilepic", upload.single("profilepic"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    
    const imageUrl = `/uploads/${req.file.filename}`;
    // Optional DB logic here

    res.status(200).json({ imageUrl: `http://localhost:3000/uploads/${req.file.filename}` });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default router;