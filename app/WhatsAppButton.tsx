// components/WhatsAppButton.tsx
"use client"; // This directive makes it a Client Component

import React from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber,
  message,
}: WhatsAppButtonProps) {
  const prefilledMessage = message ? encodeURIComponent(message) : "";
  const whatsappLink = `https://wa.me/${phoneNumber}${
    prefilledMessage ? `?text=${prefilledMessage}` : ""
  }`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        zIndex: 1000,
        textDecoration: "none",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1DA851")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
      aria-label="Chat with us on WhatsApp"
    >
      💬
    </a>
  );
}
