"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import Navbar from "../../navbar"
import Footer from "../../footer"

const monthlyPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for personal use",
    features: [
      { name: "Up to 10 packages/month", included: true },
      { name: "Basic tracking", included: true },
      { name: "Email notifications", included: true },
      { name: "Mobile access", included: true },
      { name: "SMS notifications", included: false },
      { name: "API access", included: false },
      { name: "Priority support", included: false },
      { name: "Advanced analytics", included: false },
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$9.99",
    description: "Great for small businesses",
    features: [
      { name: "Up to 100 packages/month", included: true },
      { name: "Advanced tracking", included: true },
      { name: "Email notifications", included: true },
      { name: "Mobile access", included: true },
      { name: "SMS notifications", included: true },
      { name: "API access", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: false },
    ],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      { name: "Unlimited packages", included: true },
      { name: "Advanced tracking", included: true },
      { name: "Email notifications", included: true },
      { name: "Mobile access", included: true },
      { name: "SMS notifications", included: true },
      { name: "API access", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: true },
    ],
    popular: false,
    cta: "Contact Sales",
  },
]

const yearlyPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for personal use",
    features: [
      { name: "Up to 10 packages/month", included: true },
      { name: "Basic tracking", included: true },
      { name: "Email notifications", included: true },
      { name: "Mobile access", included: true },
      { name: "SMS notifications", included: false },
      { name: "API access", included: false },
      { name: "Priority support", included: false },
      { name: "Advanced analytics", included: false },
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$99.99",
    originalPrice: "$119.88",
    description: "Great for small businesses",
    features: [
      { name: "Up to 100 packages/month", included: true },
      { name: "Advanced tracking", included: true },
      { name: "Email notifications", included: true },
      { name: "Mobile access", included: true },
      { name: "SMS notifications", included: true },
      { name: "API access", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: false },
    ],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      { name: "Unlimited packages", included: true },
      { name: "Advanced tracking", included: true },
      { name: "Email notifications", included: true },
      { name: "Mobile access", included: true },
      { name: "SMS notifications", included: true },
      { name: "API access", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: true },
    ],
    popular: false,
    cta: "Contact Sales",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const plans = isYearly ? yearlyPlans : monthlyPlans

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your tracking needs. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm ${!isYearly ? "font-medium" : "text-muted-foreground"}`}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={`text-sm ${isYearly ? "font-medium" : "text-muted-foreground"}`}>
                Yearly
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      {plan.price !== "Free" && plan.price !== "Custom" && (
                        <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                      )}
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">{plan.originalPrice}/year</div>
                    )}
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? "" : "text-muted-foreground"}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer a 14-day free trial for all paid plans. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer a 30-day money-back guarantee for all paid plans.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
