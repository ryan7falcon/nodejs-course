import sgMail from '@sendgrid/mail'

const sendgridApiKey = process.env.SENDGRID_KEY
sgMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: 'ryan7falcon@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}! Let me know how you get along with the app`,
    mail_settings: {
      sandbox_mode: {
        enable: process.env.NODE_ENV === 'test',
      },
    },
  }

  return sgMail
    .send(msg)
    .then((m) => {
      console.log('email sent', m)
    }).catch((error) => {
      console.log('err!!', error)
    })
}

const sendGoodbyeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: 'ryan7falcon@gmail.com',
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name}! Let us know if there was something we could have done to keep you in.`,
    mail_settings: {
      sandbox_mode: {
        enable: process.env.NODE_ENV === 'test',
      },
    },
  }

  return sgMail
    .send(msg)
    .then((m) => {
      console.log('email sent', m)
    }).catch((error) => {
      console.log('error!', error)
    })
}

export { sendWelcomeEmail, sendGoodbyeEmail }
