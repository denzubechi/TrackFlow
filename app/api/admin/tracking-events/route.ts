import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

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
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching tracking events:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { locationDescription, productId } = await request.json()

    if (!locationDescription || !productId) {
      return NextResponse.json({ error: "Location description and product ID are required" }, { status: 400 })
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
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error("Error creating tracking event:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
