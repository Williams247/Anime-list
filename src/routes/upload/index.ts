import express from "express";
import { uploadFile } from "@controllers";
import { multerConfig } from "@utils"

const router = express.Router();

router.post("/upload-file", multerConfig.single("file"), uploadFile);

export const uploadRoutes = { router };
