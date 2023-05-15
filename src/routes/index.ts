import express, { Application } from "express";
import { authRoutes, profileRoutes } from "./user";
import { animeRoutes } from "./anime";
import { uploadRoutes } from "./upload";

const appRouter: Application = express();

appRouter.use("/auth", authRoutes.router);
appRouter.use("/profile", profileRoutes.router);
appRouter.use("/anime", animeRoutes.router);
appRouter.use("/upload", uploadRoutes.router);

export default appRouter;
