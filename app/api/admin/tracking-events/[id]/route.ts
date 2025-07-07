import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../lib/prisma"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { locationDescription } = await request.json()

    if (!locationDescription) {
      return NextResponse.json({ error: "Location description is required" }, { status: 400 })
    }

    const event = await prisma.trackingEvent.update({
      where: { id },
      data: {
        locationDescription,
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
    console.error("Error updating tracking event:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.trackingEvent.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting tracking event:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
