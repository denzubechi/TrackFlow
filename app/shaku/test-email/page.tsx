"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, XCircle } from "lucide-react"
import Navbar from "../../../navbar"
import Footer from "../../../footer"

export default function TestEmailPage() {
  const [formData, setFormData] = useState({
    to: "",
    productName: "Sample Product",
    trackingId: "TF123456789",
    locationDescription: "Package arrived at distribution center in New York, NY",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/send-test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: "Test email sent successfully!" })
      } else {
        setResult({ success: false, message: data.error || "Failed to send email" })
      }
    } catch (error) {
      setResult({ success: false, message: "Network error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAdmin />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Test Email Notifications</h1>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Send Test Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="to">Recipient Email</Label>
                  <Input
                    id="to"
                    name="to"
                    type="email"
                    value={formData.to}
                    onChange={handleInputChange}
                    placeholder="test@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="trackingId">Tracking ID</Label>
                  <Input
                    id="trackingId"
                    name="trackingId"
                    value={formData.trackingId}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="locationDescription">Location Description</Label>
                  <Input
                    id="locationDescription"
                    name="locationDescription"
                    value={formData.locationDescription}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Sending..." : "Send Test Email"}
                </Button>
              </form>

              {result && (
                <div
                  className={`mt-4 p-4 rounded-lg flex items-center ${
                    result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {result.success ? <CheckCircle className="h-5 w-5 mr-2" /> : <XCircle className="h-5 w-5 mr-2" />}
                  {result.message}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>SMTP Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>SMTP Server:</strong> mail.essagua.com
                </p>
                <p>
                  <strong>Port:</strong> 465 (SSL)
                </p>
                <p>
                  <strong>From Email:</strong> infosw@essagua.com
                </p>
                <p>
                  <strong>Display Name:</strong> TrackFlow
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
