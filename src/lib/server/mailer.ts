import http from './http'
import { expectSettings } from './settings'

type PlaintextEmailMessage = {
  to: string
  from?: string
  subject: string
  text: string
}

type HtmlEmailMessage = {
  to: string
  from?: string
  subject: string
  html: string
}

type EmailMessage = PlaintextEmailMessage | HtmlEmailMessage

export const testMailsSent: EmailMessage[] = []

export class Mailer {
  async sendEmail(msg: EmailMessage) {
    const body: any = {
      "to": msg.to,
      "from": msg.from || "Sprachy <noreply@sprachy.com>",
      "subject": msg.subject
    }

    if ('html' in msg) {
      body.html = msg.html
    } else {
      body.text = msg.text
    }

    const { MAILGUN_SECRET } = expectSettings()

    // if (IS_TESTING) {
    //   testMailsSent.push(msg)
    // } else 
    
    if (!MAILGUN_SECRET) {
      return await http.post("https://api.mailgun.net/v3/mg.sprachy.com/messages", body, {
        headers: {
          Authorization: `Basic ${btoa(`api:${MAILGUN_SECRET}`)}`
        }
      })
    } else {
      console.log("No MAILGUN_SECRET set. Would've sent this email:")
      console.log(body)
    }
  }
}

export const mailer = new Mailer()