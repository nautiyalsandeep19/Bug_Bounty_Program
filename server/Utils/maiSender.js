import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

dotenv.config()

const mailSender = async (email, title, body) => {
  try {
    //create a conncetion

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSORD,
      },
    })

    let info = await transporter.sendMail({
      from: 'Launch Program --versantix',
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })

    console.log(info)
    return info
  } catch (error) {
    console.log(error.message)
  }
}

export default mailSender
