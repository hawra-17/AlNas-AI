"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export default function AlNasHospital() {
  const [currentPopup, setCurrentPopup] = useState(-1); // -1 means no popups shown
  const [showPopup, setShowPopup] = useState(false);

  const popupMessages = [
    "Hi how are you?",
    "I'm the AI of Alnas Hospital",
    "Ask me anything about the hospital and I will tell you",
  ];

  // Popup sequence logic and repetition
  useEffect(() => {
    const startPopupSequence = () => {
      setShowPopup(true);
      setCurrentPopup(0); // Start with first popup
    };

    // Initial popup after 2 seconds
    const initialTimer = setTimeout(startPopupSequence, 2000);

    // Repeat popup sequence every 50 seconds
    const repeatInterval = setInterval(startPopupSequence, 50 * 1000); // 50 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(repeatInterval);
    };
  }, []);

  useEffect(() => {
    if (showPopup) {
      if (currentPopup === 0) {
        // Show second popup after 3 seconds
        const timer = setTimeout(() => {
          setCurrentPopup(1);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (currentPopup === 1) {
        // Show third popup after another 3 seconds
        const timer = setTimeout(() => {
          setCurrentPopup(2);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (currentPopup === 2) {
        // Hide all popups after 3 seconds
        const timer = setTimeout(() => {
          setShowPopup(false);
          setCurrentPopup(-1);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPopup, showPopup]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Green Line */}
      <div className="h-1 bg-[#e0ffe0] w-full"></div>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/alnas-logo.png"
                  alt="Al Nas Hospital Logo"
                  className="h-14 w-auto"
                />
              </div>
            </div>

            <Button
              onClick={() =>
                window.open("https://alnas-hospital.com/", "_blank")
              }
              className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#00b0e6] hover:to-[#0060d1] text-white shadow-md rounded-full px-6 py-3"
            >
              Hospital Website
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      {/* Bottom Cyan Line */}
      <div className="h-2 bg-[#00bcd4] w-full"></div>
      {/* Main Content */}
      <div className="flex-1">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {/* Left Sidebar - AI Assistant & Contact */}
            <div className="lg:col-span-1 flex flex-col gap-6 relative">
              <Card className="border-2 border-cyan-200 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  {/* Doctor Avatar Container */}
                  <div className="relative mb-6 h-32 w-full">
                    {/* Doctor Avatar - Source Node - Fixed Position - Top Center */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center z-20">
                      <img
                        src="/doctor.png"
                        alt="AI Doctor Assistant"
                        className="w-20 h-20 rounded-full"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    AI Information Assistant
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Hospital Services & Information
                  </p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Available 24/7
                  </Badge>
                </CardContent>
              </Card>

              {/* Map-style Messages positioned outside the widget with equal spacing - Reduced width */}
              {/* Callout 1 - Top Position - Al Nas Hospital Blue */}
              {showPopup && currentPopup >= 0 && (
                <div
                  className="absolute top-2 left-full ml-4 z-40 hidden lg:block"
                  aria-live="polite"
                >
                  <div
                    className={`text-white text-sm px-4 py-3 rounded-lg shadow-xl w-54 text-left border relative transition-all duration-500 ${
                      currentPopup === 0
                        ? "bg-[#004d99] border-[#003d7a]" // Darker blue when it's the current message
                        : "bg-[#66a3e0] border-[#4d8fd9]" // Lighter blue when it's not the current message
                    } animate-fade-from-doctor`}
                  >
                    {popupMessages[0]}
                  </div>
                </div>
              )}

              {/* Callout 2 - Middle Position - Al Nas Hospital Teal/Green */}
              {showPopup && currentPopup >= 1 && (
                <div
                  className="absolute top-20 left-full ml-4 z-40 hidden lg:block"
                  aria-live="polite"
                >
                  <div
                    className={`text-white text-sm px-4 py-3 rounded-lg shadow-xl w-54 text-left border backdrop-blur-sm transition-all duration-500 ${
                      currentPopup === 1
                        ? "bg-[#006b5a] border-[#004d42]" // Darker teal when it's the current message
                        : "bg-[#66c7b8] border-[#4db8a6]" // Lighter teal when it's not the current message
                    } animate-fade-from-doctor-delayed`}
                  >
                    {popupMessages[1]}
                  </div>
                </div>
              )}

              {/* Callout 3 - Bottom Position - Al Nas Hospital Dark Blue/Navy */}
              {showPopup && currentPopup >= 2 && (
                <div
                  className="absolute top-38 left-full ml-4 z-40 hidden lg:block"
                  aria-live="polite"
                >
                  <div className="bg-[#003d66] text-white text-sm px-4 py-3 rounded-lg shadow-xl w-54 text-left border border-[#002a47] backdrop-blur-sm animate-fade-from-doctor-delayed-2">
                    {popupMessages[2]}
                  </div>
                </div>
              )}

              {/* Mobile Popups - Stack vertically below AI card with Al Nas Hospital colors */}
              <div className="lg:hidden space-y-4">
                {showPopup && currentPopup >= 0 && (
                  <div
                    className={`text-white text-sm px-4 py-3 rounded-lg shadow-lg transition-all duration-500 ${
                      currentPopup === 0 ? "bg-[#004d99]" : "bg-[#66a3e0]"
                    } animate-fade-from-doctor`}
                  >
                    {popupMessages[0]}
                  </div>
                )}
                {showPopup && currentPopup >= 1 && (
                  <div
                    className={`text-white text-sm px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-500 ${
                      currentPopup === 1 ? "bg-[#006b5a]" : "bg-[#66c7b8]"
                    } animate-fade-from-doctor-delayed`}
                  >
                    {popupMessages[1]}
                  </div>
                )}
                {showPopup && currentPopup >= 2 && (
                  <div className="bg-[#003d66] text-white text-sm px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm animate-fade-from-doctor-delayed-2">
                    {popupMessages[2]}
                  </div>
                )}
              </div>

              {/* Contact Widget - Modern Web Design */}
              <Card className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                {/* Simple Clean Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Contact Information
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Get in touch with Al Nas Hospital
                  </p>
                </div>

                <CardContent className="p-6 space-y-6">
                  {/* Emergency Contact */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#004d99] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-1">
                        Emergency Hotline
                      </h5>
                      <a
                        href="tel:16441"
                        className="text-xl font-semibold text-[#004d99] hover:text-[#003d7a] transition-colors"
                      >
                        16441
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        Available 24/7 for medical emergencies
                      </p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#E4405F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.204.013-3.583.072-4.948.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-1">
                        Follow Us
                      </h5>
                      <a
                        href="https://www.instagram.com/alnas.hospital?igsh=MWxtdXp4dTgyZTM1Zg=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-[#E4405F] hover:text-[#C13584] transition-colors"
                      >
                        @alnas.hospital
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        Latest hospital news and updates
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-1">
                        Professional Network
                      </h5>
                      <a
                        href="https://www.linkedin.com/company/al-nas-hospital/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-[#0077b5] hover:text-[#005885] transition-colors"
                      >
                        Al Nas Hospital
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        Connect with our professional network
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Welcome Section */}
              <div className="text-center mb-6">
                <div className="w-28 h-28 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <img
                    src="/alnasdoc.png"
                    alt="Doctor"
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="absolute ml-16 mt-16">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"></div>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Welcome to Al Nas Hospital Information Center
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto leading-relaxed text-sm sm:text-base px-4 sm:px-0">
                  I'm your AI information assistant, here to provide details
                  about Al Nas Hospital services, facilities, departments,
                  staff, and general hospital information. Ask me about our
                  medical services, appointment procedures, or hospital
                  facilities.
                </p>
              </div>

              {/* Direct Chat Interface */}
              <div className="h-[400px] sm:h-[500px] border border-gray-200 shadow-sm rounded-lg">
                <iframe
                  src="https://copilotstudio.microsoft.com/environments/Default-c583d714-2e15-4040-a7f0-084dcdee4dca/bots/cr0bf_alNasHospitalDoctorsChatbot/webchat?__version__=2"
                  className="w-full h-full border-0 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            © 2025 Al Nas Hospital - Hospital Information System | All Rights
            Reserved
          </div>
        </div>
      </footer>
      <style jsx>{`
        .w-54 {
          width: 13.5rem; /* 216px - reduced from 288px (w-72) */
        }

        .top-38 {
          top: 9.5rem; /* 152px */
        }

        @keyframes fade-from-doctor {
          from {
            opacity: 0;
            transform: translateX(-60px) translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        @keyframes fade-from-doctor-delayed {
          0% {
            opacity: 0;
            transform: translateX(-60px) translateY(20px) scale(0.8);
          }
          100% {
            opacity: 0.9;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        @keyframes fade-from-doctor-delayed-2 {
          0% {
            opacity: 0;
            transform: translateX(-60px) translateY(20px) scale(0.8);
          }
          100% {
            opacity: 0.8;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        .animate-fade-from-doctor {
          animation: fade-from-doctor 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fade-from-doctor-delayed {
          animation: fade-from-doctor-delayed 1.2s cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
          animation-delay: 0s; /* No delay - appears immediately when currentPopup becomes 1 */
          opacity: 0;
        }

        .animate-fade-from-doctor-delayed-2 {
          animation: fade-from-doctor-delayed-2 1.2s
            cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0s; /* No delay - appears immediately when currentPopup becomes 2 */
          opacity: 0;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
