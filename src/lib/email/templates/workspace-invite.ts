export const workspaceInviteTemplate = (inviteeName: string, workspaceName: string, message: string): string =>
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Workspace Invitation</title>
  </head>

  <body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f7;padding:40px 20px;">
      <tr>
        <td align="center">

          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td align="center" style="background:#2563eb;padding:32px;">
                <h1 style="margin:0;color:#ffffff;font-size:30px;">
                  TaskFlow
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:40px;">

                <h2 style="margin-top:0;color:#222;">
                  You're invited to join a workspace 🎉
                </h2>

                <p style="font-size:16px;line-height:1.7;color:#555;">
                  Hi <strong>${inviteeName}</strong>,
                </p>

                <p style="font-size:16px;line-height:1.7;color:#555;">
                  You've been invited to collaborate in the
                  <strong>${workspaceName}</strong> workspace on
                  <strong>TaskFlow</strong>.
                </p>

                ${
                  message
                    ? `
                  <div style="
                    margin:30px 0;
                    padding:18px;
                    background:#f8fafc;
                    border-left:4px solid #2563eb;
                    border-radius:4px;
                  ">
                    <p style="margin:0 0 8px;color:#222;font-weight:bold;">
                      Personal message
                    </p>

                    <p style="margin:0;color:#555;line-height:1.6;">
                      ${message}
                    </p>
                  </div>
                `
                    : ""
                }

                <p style="font-size:16px;line-height:1.7;color:#555;">
                  Once you accept the invitation, you'll be able to collaborate
                  with your team, manage tasks, and track project progress inside
                  the workspace.
                </p>

                <div style="text-align:center;margin:40px 0;">
                  <a
                    href="{{INVITE_URL}}"
                    style="
                      display:inline-block;
                      background:#2563eb;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 30px;
                      border-radius:6px;
                      font-weight:bold;
                    "
                  >
                    Accept Invitation
                  </a>
                </div>

                <p style="font-size:14px;color:#777;line-height:1.6;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>

                <p style="font-size:14px;word-break:break-all;color:#2563eb;">
                  {{INVITE_URL}}
                </p>

                <p style="margin-top:32px;color:#222;">
                  See you inside,<br />
                  <strong>The TaskFlow Team</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px;background:#f8f8f8;text-align:center;font-size:13px;color:#888;">
                This invitation was sent because someone invited you to join the
                <strong>${workspaceName}</strong> workspace.

                <br /><br />

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
