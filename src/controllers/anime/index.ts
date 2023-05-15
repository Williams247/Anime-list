import { Request, Response } from "express";
import { AnimeModel } from "@models";

export const createAnime = async (request: Request, response: Response) => {
  try {
    const createNewAnime = new AnimeModel(request.body);
    await createNewAnime.save();
    response.status(201).json({ message: "Anime created." });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Failed to create anime." });
  }
};

export const getAnimes = async (request: Request, response: Response) => {
  try {
    const {
      query: { page = 1, limit = 5 },
    } = request;

    const reqPage = Number(page);
    const reqLimit = Number(limit);

    if (reqPage < 1) {
      response
        .status(400)
        .json({ error: "Page value should not be less than 1" });
      return;
    }

    const animes = await AnimeModel.find()
      .skip((reqPage - 1) * reqPage)
      .limit(reqLimit);

    const count = await AnimeModel.count();

    response.status(200).json({
      message: "Success",
      results: {
        total: count,
        currentPage: reqPage,
        pages: Math.ceil(count / reqLimit),
        data: animes,
      },
    });
  } catch (error) {
    response.status(500).json({ message: "Failed to fetch animes" });
    console.log(error);
  }
};

export const getAnimeById = async (request: Request, response: Response) => {
  try {
    const {
      params: { id },
    } = request;

    const anime = await AnimeModel.findById(id);
    response.status(200).json({
      message: "Success",
      result: {
        data: anime,
      },
    });
  } catch (error) {
    response.status(500).json({ message: "Failed to fetch anime" });
    console.log(error);
  }
};

export const deleteAnime = async (request: Request, response: Response) => {
  try {
    const {
      params: { id },
    } = request;
    
    await AnimeModel.findByIdAndDelete(id);
    response.status(200).json({ message: "Anime deleted" });
  } catch (error) {
    response.status(500).json({ message: "Failed to delete anime." });
  }
};

export const updateAnime = async (request: Request, response: Response) => {
  try {
    const {
      params: { id },
      body: { image, name, description },
    } = request;

    const updateAnime = await AnimeModel.findByIdAndUpdate(id);
    if (updateAnime) {
      updateAnime.name = name ?? updateAnime.name;
      updateAnime.image = image ?? updateAnime.image;
      updateAnime.description = description ?? updateAnime.description;
      await updateAnime.save();
      response.status(200).json({ message: "Anime updated" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Failed to edit anime" });
  }
};
