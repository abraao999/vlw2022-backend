import express from "express";
import { SubmitFeedbackUseCase } from "./useCases/submitFeedbackUseCase";
import { PrismaFeedbackRepository } from "./repositories/prisma/prismaFeedbackRepository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const modemailerMailAdapter = new NodemailerMailAdapter();

  const sumbitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    modemailerMailAdapter
  );

  await sumbitFeedbackUseCase.execute({ type, comment, screenshot });

  return res.status(201).send();
});
