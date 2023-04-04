import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function sendEmail({ to, subject, html }) {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    html,
  };

  await transport.sendMail(mailOptions);
}
