import sgMail from '@sendgrid/mail'

const sendgridApiKey = process.env.SENDGRID_KEY
sgMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'ryan7falcon@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}! Let me know how you get along with the app`,
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log(`welcome email sent to ${email}`)
    }).catch((error) => {
      console.log(error)
    })
}

const sendGoodbyeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'ryan7falcon@gmail.com',
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name}! Let us know if there was something we could have done to keep you in.`,
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log(`goodbye email sent to ${email}`)
    }).catch((error) => {
      console.log(error)
    })
}

export { sendWelcomeEmail, sendGoodbyeEmail }
