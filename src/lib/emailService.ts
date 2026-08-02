import type { LoginResponse } from "@/api/auth/schema.js";
import { config } from "@/lib/config.js";
import { workspaceInviteTemplate } from "@/lib/email/templates/workspace-invite.js";
import { welcomeTemplate } from "@/lib/email/templates/welcome.js";
import {
  MailtrapSmtpEmailProvider,
  ResendEmailProvider,
  ResendSmtpEmailProvider,
  type EmailProvider,
} from "@/lib/emailProvider.js";

export class EmailService {
  constructor(private readonly provider: EmailProvider) {}

  async sendWelcomeEmail(user: Partial<LoginResponse["user"]>) {
    await this.provider.sendMail({
      from: config.smtp.emailFrom,
      to: `${user.name} <${user.email}>`,
      subject: "Welcome to TaskFlow !",
      html: welcomeTemplate(user.name),
    });
  }

  async sendWorkspaceInviteEmail(
    invitee: Pick<LoginResponse["user"], "name" | "email">,
    workspaceName: string,
    message: string,
  ) {
    await this.provider.sendMail({
      from: config.smtp.emailFrom,
      to: `${invitee.name} <${invitee.email}>`,
      subject: `Invitation to join ${workspaceName} on TaskFlow`,
      html: workspaceInviteTemplate(invitee.name, workspaceName, message),
    });
  }

  async sendBouneEmail() {
    await this.provider.sendMail({
      from: "taskflow.support@yopmail.com",
      to: "bounce+451+server+unavailable@yopmail.com",
      subject: "Bounced Email",
      html: `<strong> This is a test bounce email. It works!! </strong>`,
    });
  }
}

export const emailService = new EmailService(
  config.nodeEnv === "development" ? new MailtrapSmtpEmailProvider() : new ResendSmtpEmailProvider(),
);
