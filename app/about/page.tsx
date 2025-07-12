"use client";

import { Users, Target, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../../navbar";
import Footer from "../../footer";

const stats = [
  { label: "Packages Tracked", value: "10M+", icon: Globe },
  { label: "Happy Customers", value: "50K+", icon: Users },
  { label: "Countries Served", value: "150+", icon: Target },
  { label: "Years of Experience", value: "8+", icon: Award },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former logistics executive with 15+ years of experience in supply chain management.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech veteran who previously led engineering teams at major e-commerce platforms.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    bio: "Product strategist passionate about creating user-centric tracking solutions.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Full-stack engineer with expertise in real-time systems and scalable architecture.",
    image: "/placeholder.svg?height=300&width=300",
  },
];

const values = [
  {
    title: "Transparency",
    description:
      "We believe in complete visibility throughout the shipping process.",
    icon: Globe,
  },
  {
    title: "Reliability",
    description:
      "Our platform delivers accurate tracking information you can trust.",
    icon: Award,
  },
  {
    title: "Innovation",
    description: "We continuously improve our technology to serve you better.",
    icon: Target,
  },
  {
    title: "Customer Focus",
    description: "Your success is our priority, and we're here to support you.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About TrackFlow
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're on a mission to revolutionize package tracking with
              real-time visibility, advanced analytics, and seamless user
              experiences.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Story
              </h2>
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  TrackFlow was born out of frustration with existing package
                  tracking solutions. In 2016, our founder Sarah Johnson was
                  running a small e-commerce business and constantly fielding
                  customer inquiries about package locations. The available
                  tracking tools were either too basic, too expensive, or simply
                  unreliable.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Determined to solve this problem, Sarah assembled a team of
                  logistics experts and software engineers to build a better
                  solution. We started with a simple goal: provide real-time,
                  accurate package tracking that anyone could use and afford.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, TrackFlow serves over 50,000 customers worldwide,
                  tracking millions of packages across 150+ countries. We've
                  grown from a small startup to a trusted partner for businesses
                  of all sizes, but our mission remains the same: making package
                  tracking simple, reliable, and accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              To empower businesses and individuals with the most advanced,
              reliable, and user-friendly package tracking platform in the
              world. We believe that transparency in logistics leads to better
              customer experiences and more successful businesses.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
