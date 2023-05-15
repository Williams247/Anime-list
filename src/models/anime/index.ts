import mongoose from "mongoose";
import { Anime } from "@utils"

const Schema = mongoose.Schema;

const anime = new Schema<Anime>({
   name: {
     type: String,
     required: true
   },
   image: {
    type: String,
    required: true
   },
   description: {
    type: String,
    required: true
   }
});

export const AnimeModel = mongoose.model("anime", anime);
