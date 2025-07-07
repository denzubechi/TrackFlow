"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Package, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "../navbar"
import Footer from "../footer"

export default function HomePage() {
  const [trackingId, setTrackingId] = useState("")
  const router = useRouter()

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingId.trim()) {
      router.push(`/track/${trackingId.trim()}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Track Your Package</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Enter your tracking ID to get real-time location updates and delivery status for your package.
            </p>

            {/* Tracking Form */}
            <form onSubmit={handleTrack} className="max-w-md mx-auto mb-12">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter tracking ID (e.g., TF123456789)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="flex-1 h-12 text-lg"
                />
                <Button type="submit" size="lg" className="h-12 px-6">
                  <Search className="h-5 w-5 mr-2" />
                  Track
                </Button>
              </div>
            </form>

            {/* Sample Tracking ID */}
            <p className="text-sm text-muted-foreground mb-8">
              Try sample tracking ID: <code className="bg-muted px-2 py-1 rounded">TF123456789</code>
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose TrackFlow?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Real-time Location</h3>
                  <p className="text-muted-foreground">
                    Get precise location updates as your package moves through our network.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Instant Updates</h3>
                  <p className="text-muted-foreground">Receive notifications the moment your package status changes.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Secure Tracking</h3>
                  <p className="text-muted-foreground">
                    Your package information is protected with enterprise-grade security.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Enter Tracking ID</h3>
                <p className="text-sm text-muted-foreground">Input your unique tracking identifier</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">View Location</h3>
                <p className="text-sm text-muted-foreground">See current and past locations</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Monitor delivery progress in real-time</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Receive Package</h3>
                <p className="text-sm text-muted-foreground">Get notified upon delivery</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
