export const welcomeTemplate = (name: string = "Guest") => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to TaskFlow</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f7;padding:40px 20px;">
      <tr>
        <td align="center">

          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">

            <tr>
              <td align="center" style="background:#2563eb;padding:32px;">
                <h1 style="margin:0;color:#ffffff;font-size:30px;">
                  TaskFlow
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:40px;">
                <h2 style="margin-top:0;color:#222222;">
                  Welcome, ${name}! 👋
                </h2>

                <p style="font-size:16px;line-height:1.7;color:#555555;">
                  Thank you for joining <strong>TaskFlow</strong>.
                </p>

                <p style="font-size:16px;line-height:1.7;color:#555555;">
                  We're excited to help you organize your work, stay productive,
                  and collaborate efficiently.
                </p>

                <p style="font-size:16px;line-height:1.7;color:#555555;">
                  Your account has been successfully created and you're ready to
                  start managing your tasks.
                </p>

                <div style="text-align:center;margin:40px 0;">
                  <a
                    href="https://github.com/theonlysroy"
                    style="
                      background:#2563eb;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 28px;
                      border-radius:6px;
                      display:inline-block;
                      font-weight:bold;
                    "
                  >
                    Open TaskFlow
                  </a>
                </div>

                <p style="font-size:15px;color:#555555;">
                  If you have any questions, simply reply to this email—we're
                  always happy to help.
                </p>

                <p style="margin-top:32px;color:#222222;">
                  Best regards,<br />
                  <strong>The TaskFlow Team</strong>
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px;background:#f8f8f8;text-align:center;font-size:13px;color:#888888;">
                © ${new Date().getFullYear()} TaskFlow. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
