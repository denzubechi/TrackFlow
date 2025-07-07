"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MapPin, Clock, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "../../../navbar"
import Footer from "../../../footer"

interface TrackingEvent {
  id: string
  locationDescription: string
  timestamp: string
}

interface Product {
  id: string
  trackingId: string
  name: string
  createdAt: string
  trackingEvents: TrackingEvent[]
}

export default function TrackingPage() {
  const params = useParams()
  const trackingId = params.trackingId as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch(`/api/track/${trackingId}`)
        if (!response.ok) {
          throw new Error("Product not found")
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tracking data")
      } finally {
        setLoading(false)
      }
    }

    fetchTrackingData()
  }, [trackingId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-12 w-12 animate-pulse text-primary mx-auto mb-4" />
            <p>Loading tracking information...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Package Not Found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn't find a package with tracking ID: <code>{trackingId}</code>
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tracking
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const sortedEvents = [...product.trackingEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  const currentLocation = sortedEvents[0]?.locationDescription || "Unknown"
  const isDelivered = currentLocation.toLowerCase().includes("delivered")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tracking
              </Button>
            </Link>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Package Tracking</h1>
                <p className="text-muted-foreground">Tracking ID: {product.trackingId}</p>
              </div>
              <Badge variant={isDelivered ? "default" : "secondary"} className="text-sm">
                {isDelivered ? "Delivered" : "In Transit"}
              </Badge>
            </div>
          </div>

          {/* Package Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Package Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Product Name</p>
                  <p className="font-medium">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Location</p>
                  <p className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    {currentLocation}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tracking Started</p>
                  <p className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Updates</p>
                  <p className="font-medium">{product.trackingEvents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Tracking History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sortedEvents.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No tracking events available yet.</p>
              ) : (
                <div className="space-y-4">
                  {sortedEvents.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground"}`} />
                        {index < sortedEvents.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{event.locationDescription}</p>
                          {index === 0 && (
                            <Badge variant="outline" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
