import dotenv from "dotenv";
import nodemailer from "nodemailer";
import express from "express";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const email = req.headers.email;
  const message = req.headers.message;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "MarronTech",
    html: `Hello! Thank you for sending a message.<br/><br/>This is an automated responce. <br/><br/> I will make sure that I reply to you as soon as I read your message, I typically reply within 24 hours and just for you to remember, here's' your message to us<br/><br/> <blockquote>"${message}"</blockquote><br/><br/><b>Alrights Reserved &copy; 2021</b><br/><b>www.marrontech.me</b>`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    return err
      ? res.status(400).send(err)
      : res.status(200).send(data.response);
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listening to port ", process.env.PORT);
});
