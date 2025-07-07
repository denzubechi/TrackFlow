import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../lib/prisma"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { name, trackingId } = await request.json()

    if (!name || !trackingId) {
      return NextResponse.json({ error: "Name and tracking ID are required" }, { status: 400 })
    }

    // Check if tracking ID already exists for a different product
    const existingProduct = await prisma.product.findFirst({
      where: {
        trackingId,
        NOT: { id },
      },
    })

    if (existingProduct) {
      return NextResponse.json({ error: "Tracking ID already exists" }, { status: 400 })
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        trackingId,
      },
      include: {
        trackingEvents: {
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
