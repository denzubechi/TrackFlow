import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { sendEmail, generateTrackingUpdateEmail } from "../../../../lib/email";

export async function GET() {
  try {
    const events = await prisma.trackingEvent.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
            trackingId: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching tracking events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { locationDescription, productId } = await request.json();

    if (!locationDescription || !productId) {
      return NextResponse.json(
        { error: "Location description and product ID are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        name: true,
        trackingId: true,
        email: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const event = await prisma.trackingEvent.create({
      data: {
        locationDescription,
        productId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            trackingId: true,
          },
        },
      },
    });

    if (product.email) {
      try {
        const emailHtml = generateTrackingUpdateEmail(
          product.name,
          product.trackingId,
          locationDescription,
          event.timestamp.toLocaleString()
        );

        await sendEmail({
          to: product.email,
          subject: `📦 Package Update: ${product.name} - ${product.trackingId}`,
          html: emailHtml,
        });

        console.log(
          `Email notification sent to ${product.email} for tracking event`
        );
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating tracking event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
