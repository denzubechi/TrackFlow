"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "../../navbar";
import Footer from "../../footer";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@trackflow.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (812) 207-9729",
    description: "Mon-Fri from 8am to 6pm EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Tech Street, San Francisco, CA 94105",
    description: "Our headquarters",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Monday - Friday: 8am - 6pm EST",
    description: "We're here to help",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (value: string) => {
    setFormData({
      ...formData,
      subject: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Have questions about TrackFlow? We'd love to hear from you. Send
              us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      <p className="font-medium mb-1">{info.details}</p>
                      <p className="text-sm text-muted-foreground">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We'll get back to you
                        within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company name (optional)"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={handleSubjectChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="support">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="billing">
                              Billing Question
                            </SelectItem>
                            <SelectItem value="partnership">
                              Partnership
                            </SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          placeholder="Tell us how we can help you..."
                          rows={5}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">
                  How quickly do you respond to inquiries?
                </h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond to all inquiries within 24 hours during
                  business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Do you offer phone support?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes, phone support is available for Pro and Enterprise
                  customers during business hours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I schedule a demo?</h3>
                <p className="text-muted-foreground text-sm">
                  Contact us to schedule a personalized demo of TrackFlow's
                  features.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Do you offer custom integrations?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we provide custom integration services for Enterprise
                  customers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
