import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

const sendMail = async (email, subject, templateName, templateData) => {
  try {
    if (!process.env.NODEMAILER_USER || !process.env.NODEMAILER_PASSWORD) {
      throw new Error("Missing environment variables for email configuration.");
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const templatePath = path.resolve(
      `src/utils/emailTemplates/${templateName}.html`
    );
    const source = fs.readFileSync(templatePath, "utf-8");
    const template = handlebars.compile(source);
    const htmlContent = template(templateData);

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: subject,
      html: htmlContent,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    });
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export { sendMail };
