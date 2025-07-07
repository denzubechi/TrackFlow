import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function GET() {
  try {
    const [totalProducts, totalEvents, recentProducts] = await Promise.all([
      prisma.product.count(),
      prisma.trackingEvent.count(),
      prisma.product.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          _count: {
            select: {
              trackingEvents: true,
            },
          },
        },
      }),
    ])

    return NextResponse.json({
      totalProducts,
      totalEvents,
      recentProducts,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
