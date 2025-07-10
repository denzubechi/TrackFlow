"use client";

import Link from "next/link";
import { Package, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Track Package", href: "/" },
    { name: "How it Works", href: "/" },
  ],
  company: [
    {
      name: "About Us",
      href: "https://api.whatsapp.com/send/?phone=18122079729",
    },
    {
      name: "Contact",
      href: "https://api.whatsapp.com/send/?phone=18122079729",
    },
  ],
  support: [{ name: "Help Center", href: "#" }],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { name: "Email", href: "mailto:hello@trackflow.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {" "}
            {/* Adjusted grid columns */}
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              {" "}
              {/* Adjusted column span */}
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Package className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">TrackFlow</span>
              </Link>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                Real-time package tracking with precise location updates. Track
                your shipments from origin to destination with complete
                transparency.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target={
                        item.href.startsWith("mailto:") ? "_self" : "_blank"
                      } // Open mailto in same tab
                      rel={
                        item.href.startsWith("mailto:")
                          ? ""
                          : "noopener noreferrer"
                      } // No rel for mailto
                    >
                      <span className="sr-only">{item.name}</span>
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Product Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Company Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Support & Legal Links combined for simplicity */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Support & Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Essential Legal Links */}
        <div className="border-t py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TrackFlow. All rights reserved.
            </p>

            <div className="flex items-center space-x-6"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
