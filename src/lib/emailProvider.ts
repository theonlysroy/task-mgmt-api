import { ApiError } from "@/lib/ApiError.js";
import { config } from "@/lib/config.js";
import { logger } from "@/lib/logger.js";
import { createTransport } from "nodemailer";
import type { SendMailOptions, SentMessageInfo, Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { Resend } from "resend";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  idempotencyKey?: string;
};

type EmailProviderConfig = Pick<SMTPTransport.Options, "host" | "port" | "secure" | "auth">;

export abstract class EmailProvider {
  protected readonly transporter: Transporter;

  constructor(config: EmailProviderConfig) {
    this.transporter = createTransport({
      secure: false,
      pool: true,
      maxConnections: 3,
      maxMessages: 50,
      ...config,
    });
  }

  async sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
    return this.transporter.sendMail(options, (error, _) => {
      if (error) {
        logger.error("Email Sending Failed =>", error);
      }
    });
  }
}

export class ResendEmailProvider {
  private readonly client = new Resend(config.smtp.resendApiKey);
  private readonly from: string = "TaskFlow <oboarding@resend.dev>";

  async send({ to }: SendEmailOptions): Promise<string> {
    const { data, error } = await this.client.emails.send({
      from: this.from,
      to: "delivered@resend.dev",
      subject: "Welcome to TaskFlow",
      html: "<strong>welcome email. It works!!</strong>",
    });
    if (error) throw ApiError.internalError();
    return data.id;
  }
}

export class ResendSmtpEmailProvider extends EmailProvider {
  constructor() {
    super({
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
    });
  }
}

export class MailtrapSmtpEmailProvider extends EmailProvider {
  constructor() {
    super({
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
    });
  }
}
