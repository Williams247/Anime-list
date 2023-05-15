import { Request, Response, NextFunction } from "express";
import { Anime } from "@utils"
import Joi from "joi";

export const validateCreateUpdateAnime = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<Anime>({
    name: Joi.string().required().label("Name"),
    image: Joi.string().required().label("Image"),
    description: Joi.string().required().label("Description"),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response.status(400).json({ message: error.message });
    return;
  }

  next();
};
