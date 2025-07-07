import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { trackingId: string } }) {
  try {
    const { trackingId } = params

    const product = await prisma.product.findUnique({
      where: {
        trackingId: trackingId,
      },
      include: {
        trackingEvents: {
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
