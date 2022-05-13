import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbackRepository } from "../repositories/FeedbacksRepositories";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });
    if (!type) {
      throw new Error("Type is required");
    }
    if (!comment) {
      throw new Error("comment is required");
    }
    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("invalid screenshot format");
    }
    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div>`,
        `<p>tipo novo feedback: ${type}</p>`,
        `<p>comentario: ${comment}</p>`,
        screenshot ? `<img src=${screenshot}/>` : '',
        `</div>`,
      ].join("\n"),
    });
  }
}
