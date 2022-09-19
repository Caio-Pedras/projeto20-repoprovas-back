import sgMail from "@sendgrid/mail";
import { findAllUsers } from "../repositories/authRepository";

export async function sendEmail(data: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  try {
    const users = await findAllUsers();
    const message = {
      to: users,
      from: "caio.vp@gmail.com",
      subject: "Prova Adicionada Repoprovas",
      text: data,
      html: `<em>${data}</em>`,
    };

    await sgMail.send(message);
  } catch (err) {
    console.log(err);
  }
}
