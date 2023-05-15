import express from "express";
import { validateCreateUpdateAnime } from "@middlewares";

import {
  createAnime,
  getAnimes,
  getAnimeById,
  updateAnime,
} from "@controllers";

const router = express.Router();

router.get("/get-anime/:id", getAnimeById);
router.get("/get-animes", getAnimes);
router.post("/create-anime", validateCreateUpdateAnime, createAnime);
router.put("/update-anime/:id", validateCreateUpdateAnime, updateAnime);

export const animeRoutes = { router };
