import http from './http'
import { env } from './env'

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

export type EmailMessage = PlaintextEmailMessage | HtmlEmailMessage

export const testMailsSent: EmailMessage[] = []

export class Mailer {
  testMailsSent: EmailMessage[] = []

  testMailsSentTo(email: string) {
    return this.testMailsSent.filter(m => m.to === email)
  }

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

    if (env.TESTING) {
      this.testMailsSent.push(msg)
    } else if (env.MAILGUN_SECRET) {
      await http.post("https://api.mailgun.net/v3/mg.sprachy.com/messages", body, {
        headers: {
          Authorization: `Basic ${btoa(`api:${env.MAILGUN_SECRET}`)}`
        }
      })
    } else {
      console.log("No MAILGUN_SECRET set. Would've sent this email:")
      console.log(body)
    }
  }
}

export const mailer = new Mailer()