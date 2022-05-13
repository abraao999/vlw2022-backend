import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3dbda51b5c10d5",
    pass: "b2f791b8388c15",
  },
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail ({subject, body}: SendMailData) {
    await transport.sendMail({
    from: "equipe feedback <oi@feedget.com>",
    to: "Abraao <drs5-suporte@saude.sp.gov.br>",
    subject: subject,
    html: body
  });
  };

}