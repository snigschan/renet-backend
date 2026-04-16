// Email automation using SendGrid
// Documentation: https://docs.sendgrid.com/

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  htmlContent: string
  textContent: string
}

export interface EmailOptions {
  to: string | string[]
  from?: string
  subject: string
  html?: string
  text?: string
  templateId?: string
  dynamicData?: Record<string, any>
  attachments?: Array<{
    content: string
    filename: string
    type: string
  }>
}

export class EmailService {
  private apiKey: string
  private baseUrl = "https://api.sendgrid.com/v3"
  private defaultFrom = process.env.SENDGRID_FROM_EMAIL || "noreply@renet.com"

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || ""
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const payload = {
        personalizations: [
          {
            to: Array.isArray(options.to) ? options.to.map((email) => ({ email })) : [{ email: options.to }],
            dynamic_template_data: options.dynamicData || {},
          },
        ],
        from: { email: options.from || this.defaultFrom },
        subject: options.subject,
        content: [
          {
            type: "text/html",
            value: options.html || options.text || "",
          },
        ],
        template_id: options.templateId,
        attachments: options.attachments,
      }

      const response = await fetch(`${this.baseUrl}/mail/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      console.log("[v0] Email sent successfully to:", options.to)
      return true
    } catch (error) {
      console.error("[v0] Email service error:", error)
      return false
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    return this.sendEmail({
      to,
      subject: "Welcome to RENet - Your Real Estate Career Starts Here",
      html: this.getWelcomeEmailTemplate(name),
    })
  }

  async sendApplicationConfirmation(to: string, jobTitle: string, company: string): Promise<boolean> {
    return this.sendEmail({
      to,
      subject: `Application Received: ${jobTitle} at ${company}`,
      html: this.getApplicationConfirmationTemplate(jobTitle, company),
    })
  }

  async sendInterviewInvitation(
    to: string,
    candidateName: string,
    jobTitle: string,
    interviewDate: string,
    interviewLink: string,
  ): Promise<boolean> {
    return this.sendEmail({
      to,
      subject: `Interview Invitation: ${jobTitle}`,
      html: this.getInterviewInvitationTemplate(candidateName, jobTitle, interviewDate, interviewLink),
    })
  }

  async sendJobMatchNotification(to: string, matches: number): Promise<boolean> {
    return this.sendEmail({
      to,
      subject: `${matches} New Job Matches Found on RENet`,
      html: this.getJobMatchTemplate(matches),
    })
  }

  private getWelcomeEmailTemplate(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #008080 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to RENet!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Welcome to RENet - the Middle East's premier professional network for real estate careers!</p>
              <p>Your account has been successfully created. You now have access to:</p>
              <ul>
                <li>AI-powered job matching with 95% accuracy</li>
                <li>Exclusive opportunities across the GCC</li>
                <li>Professional networking with industry leaders</li>
                <li>Career resources and training</li>
              </ul>
              <p>Get started by completing your profile to receive personalized job recommendations.</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile" class="button">Complete Your Profile</a>
              <p>If you have any questions, our support team is here to help.</p>
              <p>Best regards,<br>The RENet Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 RENet. All rights reserved.</p>
              <p>Real Estate Experts Online Network</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private getApplicationConfirmationTemplate(jobTitle: string, company: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #008080 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .job-details { background: #f5f5f5; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Application Received</h1>
            </div>
            <div class="content">
              <p>Your application has been successfully submitted!</p>
              <div class="job-details">
                <h3>${jobTitle}</h3>
                <p><strong>Company:</strong> ${company}</p>
              </div>
              <p>The hiring team will review your application and contact you if your profile matches their requirements.</p>
              <p>In the meantime, you can:</p>
              <ul>
                <li>Track your application status in your dashboard</li>
                <li>Explore similar opportunities</li>
                <li>Connect with professionals in your field</li>
              </ul>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/applications" class="button">View Application Status</a>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private getInterviewInvitationTemplate(
    candidateName: string,
    jobTitle: string,
    interviewDate: string,
    interviewLink: string,
  ): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #008080 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .interview-details { background: #f5f5f5; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Interview Invitation</h1>
            </div>
            <div class="content">
              <p>Dear ${candidateName},</p>
              <p>Congratulations! You've been selected for an interview.</p>
              <div class="interview-details">
                <h3>${jobTitle}</h3>
                <p><strong>Interview Date:</strong> ${interviewDate}</p>
                <p><strong>Format:</strong> Video Interview</p>
              </div>
              <p>Please join the interview using the link below at the scheduled time:</p>
              <a href="${interviewLink}" class="button">Join Interview</a>
              <p><strong>Preparation Tips:</strong></p>
              <ul>
                <li>Test your camera and microphone beforehand</li>
                <li>Find a quiet, well-lit location</li>
                <li>Review the job description and company information</li>
                <li>Prepare questions for the interviewer</li>
              </ul>
              <p>Good luck!</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private getJobMatchTemplate(matches: number): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #008080 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .match-count { font-size: 48px; font-weight: bold; color: #D4AF37; text-align: center; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Job Matches!</h1>
            </div>
            <div class="content">
              <p>Great news! We've found new opportunities that match your profile.</p>
              <div class="match-count">${matches}</div>
              <p style="text-align: center; font-size: 18px; color: #666;">New Matches</p>
              <p>These positions align with your skills, experience, and career goals. Don't miss out on these opportunities!</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/search" class="button">View Matches</a>
              <p>Our AI matching system has analyzed thousands of job postings to find the best fits for you.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }
}
