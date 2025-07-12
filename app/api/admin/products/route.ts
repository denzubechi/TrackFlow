import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        trackingEvents: {
          orderBy: {
            timestamp: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, trackingId, email } = await request.json()

    if (!name || !trackingId || !email) {
      return NextResponse.json({ error: "Name, tracking ID, and email are required" }, { status: 400 })
    }

    // Check if tracking ID already exists
    const existingProduct = await prisma.product.findUnique({
      where: { trackingId },
    })

    if (existingProduct) {
      return NextResponse.json({ error: "Tracking ID already exists" }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        trackingId,
        email,
      },
      include: {
        trackingEvents: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
