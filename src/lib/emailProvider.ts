import { ApiError } from "@/lib/ApiError.js";
import { config } from "@/lib/config.js";
import { Resend } from "resend";

type SendEmailOptions = {
  to: string;
};

class EmailProvider {
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

export const emailService = new EmailProvider();
