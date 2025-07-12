import { NextResponse } from "next/server"
import { sendEmail, generateTrackingUpdateEmail } from "../../../lib/email"

export async function POST(request: Request) {
  try {
    const { to, productName, trackingId, locationDescription } = await request.json()

    if (!to || !productName || !trackingId || !locationDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailHtml = generateTrackingUpdateEmail(
      productName,
      trackingId,
      locationDescription,
      new Date().toISOString(),
    )

    const result = await sendEmail({
      to,
      subject: `📦 Test Package Update: ${productName} - ${trackingId}`,
      html: emailHtml,
    })

    if (result.success) {
      return NextResponse.json({ message: "Test email sent successfully", messageId: result.messageId })
    } else {
      return NextResponse.json({ error: "Failed to send email", details: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error sending test email:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
