import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Import routes here
import studentRoutes from "./routes/student.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import classRoutes from "./routes/class.route.js";
import assignmentRoutes from "./routes/assignment.route.js";
import classStudentRoutes from "./routes/classStudent.route.js";
import classResourceRoutes from "./routes/classResource.route.js";
import assignmentSubmissionRoutes from "./routes/assignmentSubmission.route.js";

// Use routes here
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/enrollments", classStudentRoutes);
app.use("/api/v1/resources", classResourceRoutes);
app.use("/api/v1/submissions", assignmentSubmissionRoutes);

export { app };