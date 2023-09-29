import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "Info@yookatale.com",
          pass: "info@y00k@Ta13-Pas5",
        },
      });

      const mailOptions = {
        from: "Info@yookatale.com",
        to: email,
        subject: "Welcome to our Food Market!",
        html: "<p>Your email content goes here.</p>",
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "An error occurred while sending the email" });
    }
  } else {
    res.status(405).end();
  }
}