"use client"

import { Check, MapPin, Clock, Shield, Smartphone, BarChart3, Bell, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "../../navbar"
import Footer from "../../footer"

const features = [
  {
    icon: MapPin,
    title: "Real-time Location Tracking",
    description: "Get precise GPS coordinates and location updates as your package moves through our network.",
    benefits: ["Live GPS tracking", "Accurate location data", "Route optimization", "Delivery predictions"],
  },
  {
    icon: Clock,
    title: "Instant Notifications",
    description: "Receive immediate alerts when your package status changes or reaches key milestones.",
    benefits: ["SMS notifications", "Email alerts", "Push notifications", "Custom triggers"],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your tracking data is protected with bank-level encryption and security protocols.",
    benefits: ["256-bit encryption", "Secure API", "Data privacy", "GDPR compliant"],
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Track your packages seamlessly across all devices with our responsive design.",
    benefits: ["Mobile app", "Responsive web", "Offline tracking", "Cross-platform"],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get detailed insights into delivery patterns, performance metrics, and trends.",
    benefits: ["Delivery analytics", "Performance reports", "Trend analysis", "Custom dashboards"],
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Intelligent notification system that learns your preferences and delivery patterns.",
    benefits: ["AI-powered alerts", "Predictive notifications", "Custom schedules", "Priority filtering"],
  },
]

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for personal use",
    features: ["Up to 10 packages/month", "Basic tracking", "Email notifications", "Mobile access"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99/month",
    description: "Great for small businesses",
    features: [
      "Up to 100 packages/month",
      "Advanced tracking",
      "SMS + Email notifications",
      "API access",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited packages",
      "Custom integrations",
      "Dedicated support",
      "Advanced analytics",
      "White-label solution",
    ],
    popular: false,
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Powerful Features</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover all the advanced features that make TrackFlow the most comprehensive package tracking platform
              available.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select the perfect plan for your tracking needs. All plans include our core features with varying limits
                and capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{plan.price}</div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Seamless Integrations</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Connect TrackFlow with your existing tools and workflows for a complete tracking solution.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["Shopify", "WooCommerce", "Amazon", "eBay", "Magento", "BigCommerce", "Zapier", "Slack"].map(
                (integration, index) => (
                  <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium">{integration}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
