import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.essagua.com",
  port: 465,
  secure: true,
  auth: {
    user: "infosw@essagua.com",
    pass: "Javagame@1",
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: '"TrackFlow" <infosw@essagua.com>',
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}

export function generateTrackingUpdateEmail(
  productName: string,
  trackingId: string,
  locationDescription: string,
  timestamp: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Package Location Update - TrackFlow</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .update-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0; }
        .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📦 Package Location Update</h1>
          <p>Your package is on the move!</p>
        </div>
        
        <div class="content">
          <h2>Hello!</h2>
          <p>We have a new location update for your package:</p>
          
          <div class="update-box">
            <h3><strong>${productName}</strong></h3>
            <p><strong>Tracking ID:</strong> ${trackingId}</p>
            <p><strong>Current Location:</strong> ${locationDescription}</p>
            <p><strong>Updated:</strong> ${new Date(
              timestamp
            ).toLocaleString()}</p>
          </div>
          
          <p>You can track your package in real-time by clicking the button below:</p>
          
          <a href="${
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
          }/track/${trackingId}" class="button">
            Track Your Package
          </a>
          
          <p>Thank you for using TrackFlow!</p>
        </div>
        
        <div class="footer">
          <p>This is an automated message from TrackFlow. Please do not reply to this email.</p>
          <p>If you have any questions, contact us at support@trackflow.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
