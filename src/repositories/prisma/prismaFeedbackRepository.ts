import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../FeedbacksRepositories";

export class PrismaFeedbackRepository implements FeedbackRepository{
  async create ({type, comment, screenshot}: FeedbackCreateData){
    const response = await prisma.feedback.create({
      data: { type, comment, screenshot },
    });
  }
}