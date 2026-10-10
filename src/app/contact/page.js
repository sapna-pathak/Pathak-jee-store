"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, Sparkles, Truck } from "lucide-react";

export default function ContactPage() {
  const [orderText, setOrderText] = useState("");
  const [inquiryType, setInquiryType] = useState("order");

  function sendToWhatsApp(e) {
    e.preventDefault();
    if (!orderText.trim()) return;

    let prefix = "Hello Pathak Jee Store,";
    if (inquiryType === "order") {
      prefix = "Hello Pathak Jee Store, I would like to place an order for:";
    } else if (inquiryType === "rate") {
      prefix = "Hello Pathak Jee Store, I want to inquire about rates & stock for:";
    } else {
      prefix = "Hello Pathak Jee Store,";
    }

    const fullMessage = encodeURIComponent(`${prefix}\n\n${orderText.trim()}`);
    window.open(`https://wa.me/919650500935?text=${fullMessage}`, "_blank");
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white py-14 sm:py-20 text-center">
        <div className="container-page max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We&apos;re Always Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Contact Pathak Jee Store
          </h1>
          <p className="mt-3 text-orange-100 text-sm sm:text-base leading-relaxed">
            Need current rates, home delivery, or bulk essentials? Connect with us instantly via phone, WhatsApp, or visit the shop.
          </p>
        </div>
      </section>

      {/* 2. Contact Action Cards Grid */}
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-16 sm:-mt-20 relative z-10">
            
            {/* Phone */}
            <a
              href="tel:+919650500935"
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200/80 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Call Us</p>
              <p className="text-base font-extrabold text-slate-900 mt-1">+91 9650500935</p>
              <p className="text-xs text-slate-500 mt-1">Available 7:00 AM – 10:00 PM</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919650500935"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-emerald-200/80 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">WhatsApp Chat</p>
              <p className="text-base font-extrabold text-slate-900 mt-1">Message Directly</p>
              <p className="text-xs text-slate-500 mt-1">Fast replies within 5 mins</p>
            </a>

            {/* Email */}
            <a
              href="mailto:pathakjee89@gmail.com"
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200/80 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1 break-all">pathakjee89@gmail.com</p>
              <p className="text-xs text-slate-500 mt-1">For queries &amp; feedback</p>
            </a>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Opening Hours</p>
              <p className="text-base font-extrabold text-slate-900 mt-1">Mon – Sun (7 Days)</p>
              <p className="text-xs text-slate-500 mt-1">7:00 AM – 10:00 PM</p>
            </div>

          </div>

          {/* Interactive WhatsApp Quick Message Builder */}
          <div className="mt-14 sm:mt-18 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Direct WhatsApp Messenger
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                Send Your Order or Inquiry
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Type your items or questions below, and click send. It will immediately open WhatsApp with your message pre-formatted.
              </p>

              <form onSubmit={sendToWhatsApp} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Inquiry Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "order", label: "🛒 Grocery Order" },
                      { id: "rate", label: "🏷️ Rate Check" },
                      { id: "general", label: "💬 General Query" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setInquiryType(type.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                          inquiryType === type.id
                            ? "bg-orange-50 border-orange-500 text-orange-700 font-bold"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Items / Message
                  </label>
                  <textarea
                    rows={5}
                    value={orderText}
                    onChange={(e) => setOrderText(e.target.value)}
                    placeholder="E.g.&#10;• 2L Full Cream Milk&#10;• 5kg Aashirvaad Atta&#10;• 1kg Tata Salt&#10;• 1 Tray Eggs&#10;Please deliver to Flat 302..."
                    className="w-full rounded-2xl border border-slate-200 p-4 text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-whatsapp py-3.5 text-sm sm:text-base font-bold shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Directly on WhatsApp (+91 9650500935)</span>
                </button>
              </form>
            </div>

            {/* Right Information & Delivery Policy */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Neighbourhood Delivery</h3>
                    <p className="text-xs text-emerald-700 font-medium">Free for orders above ₹500</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We deliver to all apartment complexes and homes within 2-3 km. Average delivery turnaround is 30 minutes from confirmation!
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Store Location</h3>
                    <p className="text-xs text-slate-500">Walk-in anytime</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Pathak Jee General Store</strong><br />
                  Local Market Area, Neighbourhood Community<br />
                  Open all 7 days from 7:00 AM – 10:00 PM.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <a
                    href="tel:+919650500935"
                    className="btn-primary text-xs py-2 px-4"
                  >
                    Call for Directions
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
