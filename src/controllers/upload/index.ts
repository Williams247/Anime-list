import { Request, Response } from "express";
import { cloudinaryUpload } from "@utils";

export const uploadFile = async (request: Request, response: Response) => {
  const { file } = request;
  try {
    if (!file) {
      response.status(400).json({ error: "A file is required for upload" });
      return;
    }

    const serverResponse = await cloudinaryUpload.uploader.upload(file?.path);

    response.status(201).json({
      message: "File uploaded",
      public_id: serverResponse.public_id,
      imageUrl: serverResponse.url,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Failed to upload file" });
  }
};
