"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function GoogleBusinessProfilePage() {
  const [activeTab, setActiveTab] = useState("essential-info")
  const [activeCustomerTab, setActiveCustomerTab] = useState("create-posts")
  const [expandedFaq, setExpandedFaq] = useState<string | null>("free-reinstatement")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false) // Close mobile menu after clicking
  }

  const testimonials = [
    {
      quote:
        "Being reinstated brought our calls back within days. The clear checklist and one complete appeal made the difference.",
      name: "Michael Thompson",
      business: "Thompson's Roofing Services",
      image: "/roofing-contractor-owner.png",
    },
    {
      quote:
        "We lost 80% of our online visibility when suspended. The reinstatement process got us back to full capacity in just one week.",
      name: "Mike Rodriguez",
      business: "Rodriguez Family Restaurant",
      image: "/restaurant-owner-chef.png",
    },
    {
      quote: "The step-by-step guidance was exactly what we needed. No guesswork, just clear instructions that worked.",
      name: "James Chen",
      business: "Chen's Electronics Repair",
      image: "/electronics-repair-owner.png",
    },
    {
      quote:
        "After months of trying on our own, the professional approach got our profile reinstated in 5 days. Worth every penny.",
      name: "David Thompson",
      business: "Thompson Plumbing Co.",
      image: "/plumbing-contractor-owner.png",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const tabContent = {
    "essential-info": {
      title: "Correct business name, address, and hours to meet Google's guidelines",
      description:
        "Ensure your business information exactly matches official documents. Inconsistent details are a common cause of suspensions, so we'll help you align everything perfectly.",
    },
    "photos-logos": {
      title: "Upload storefront or service-area proof to verify legitimacy",
      description:
        "Provide clear photos of your physical location, signage, or service area documentation. Visual proof helps Google verify your business is real and operating.",
    },
    "show-identity": {
      title: "Submit official documents (utility bills, licence, lease) that match your profile details",
      description:
        "Gather documents like business licenses, utility bills, or lease agreements that show the same name and address as your profile. Matching documentation is crucial for reinstatement.",
    },
  }

  const customerTabContent = {
    "create-posts": {
      title: "Submit your reinstatement appeal with full supporting evidence",
      description:
        "Compile all corrected information and supporting documents into one comprehensive appeal. A complete submission increases your chances of approval.",
    },
    "respond-reviews": {
      title: "Monitor reinstatement progress and respond quickly to Google support requests",
      description:
        "Stay alert for any follow-up questions from Google during the review process. Quick responses help avoid delays in getting your profile restored.",
    },
    "post-faqs": {
      title: "Prepare answers to common reinstatement questions to avoid delays",
      description:
        "Have explanations ready for why the suspension occurred and what you've done to fix it. Clear communication speeds up the reinstatement process.",
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/max-market-pros-logo.png" alt="Max Market Pros" className="h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                FAQ
              </button>
            </nav>

            <div className="flex items-center space-x-3">
              <Button
                asChild
                className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium"
              >
                <a href="tel:+19496030389">Call Now: (949) 603-0389</a>
              </Button>
              <Button className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
                Start Now
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12M6 12h12"
                    />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 text-left"
                >
                  Process
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 text-left"
                >
                  FAQ
                </button>
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium mx-2 mt-2"
                >
                  <a href="tel:+19496030389">Call Now: (949) 603-0389</a>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium mx-2">
                  Start Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="bg-background" id="home">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 lg:space-y-10">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-tight tracking-tight">
                  Get your <span className="text-blue-600 font-medium">Google Business Profile</span> reinstated
                </h1>

                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg font-normal">
                  Restore your business visibility on Google Search and Maps with our compliant reinstatement process.
                  No duplicates, no permanent removal risk.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Get started
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-muted px-8 py-4 rounded-lg text-base font-medium bg-transparent"
                >
                  <a href="tel:+19496030389">Call: (949) 603-0389</a>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Fast reinstatement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Compliant process</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Expert guidance</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl transform rotate-3"></div>
                <img
                  src="/GBP-Suspension_Hero-Image.webp"
                  alt="Google Business Profile suspension notification"
                  className="relative w-full max-w-lg h-auto rounded-2xl shadow-2xl border border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="services">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">Proven Process</h3>
            <p className="text-gray-600">A step-by-step system that gets your profile reinstated faster</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">Easy</h3>
            <p className="text-gray-600">Simple, step-by-step reinstatement process</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 01.951-.69l1.07-3.292z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">Personalised</h3>
            <p className="text-gray-600">Evidence checklist tailored to your suspension reason</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            Get started
          </Button>
          <Button className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
            Start Now
          </Button>
        </div>
      </section>

      {/* Take charge of your first impression section */}
      <section className="bg-gray-50 py-20" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fix the issues that caused your suspension</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fix the issues that caused your suspension and submit one strong appeal to restore your Business Profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {Object.entries(tabContent).map(([key, content], index) => (
                <div key={key} className="flex items-start space-x-6">
                  <div
                    className={`w-1 rounded-full mt-2 ${activeTab === key ? "bg-blue-600 h-20" : "bg-gray-300 h-16"}`}
                  ></div>
                  <div className="flex-1">
                    <button
                      onClick={() => setActiveTab(key)}
                      className={`text-left w-full group ${
                        activeTab === key ? "text-blue-600" : "text-gray-900 hover:text-blue-600"
                      }`}
                    >
                      <h3 className="text-2xl font-medium mb-2 transition-colors">{content.title}</h3>
                    </button>
                    {activeTab === key && (
                      <p className="text-gray-600 leading-relaxed mt-4 animate-in fade-in duration-200">
                        {content.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/google-mobile-profile.webp"
                  alt="Mobile phone showing Google Search with Business Profile card"
                  className="w-full max-w-md h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Get started
            </Button>
            <Button className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
              Start Now
            </Button>
          </div>
        </div>
      </section>

      {/* Easily connect with customers section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Reinstatement reconnects you with customers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Reinstatement reconnects you with customers searching for your services—so you don't miss calls, visits,
              or sales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 flex items-center justify-center">
                  <img
                    src="/google-suspension-square.webp"
                    alt="Suspended Google Business Profile with red prohibition symbol"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {Object.entries(customerTabContent).map(([key, content], index) => (
                <div key={key} className="flex items-start space-x-6">
                  <div
                    className={`w-1 rounded-full mt-2 ${
                      activeCustomerTab === key ? "bg-blue-600 h-20" : "bg-gray-300 h-16"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <button
                      onClick={() => setActiveCustomerTab(key)}
                      className={`text-left w-full group ${
                        activeCustomerTab === key ? "text-blue-600" : "text-gray-900 hover:text-blue-600"
                      }`}
                    >
                      <h3 className="text-2xl font-medium mb-2 transition-colors">{content.title}</h3>
                    </button>
                    {activeCustomerTab === key && (
                      <p className="text-gray-600 leading-relaxed mt-4 animate-in fade-in duration-200">
                        {content.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Get started
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+19496030389">Call: (949) 603-0389</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services and Analytics Section - Redesigned as timeline */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Your business gets back online fast</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how reinstatement helps contractors reconnect with customers and track new business opportunities.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 rounded-full hidden lg:block"></div>

            <div className="space-y-12">
              {/* Timeline Item 1 - Resume Orders */}
              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/2 lg:pr-12">
                  <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-400">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Resume Customer Inquiries</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Once reinstated, customers can find your services again—through quote requests, emergency calls,
                      and project bookings.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Get started
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="tel:+19496030389">Call: (949) 603-0389</a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Timeline connector */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-background z-10"></div>

                <div className="lg:w-1/2 lg:pl-12">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                    <div className="bg-white rounded-xl shadow-md p-4 max-w-sm mx-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">Summit Roofing Co.</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 01.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm text-primary mb-4 border-b border-gray-200 pb-2">Roofing Services</div>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-full text-sm font-medium">
                        GET FREE ESTIMATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 - Track Performance */}
              <div className="relative flex flex-col lg:flex-row-reverse items-center gap-8">
                <div className="lg:w-1/2 lg:pl-12">
                  <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-400">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Track New Leads</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      After reinstatement, monitor how customers find your services—see which searches, calls, and quote
                      requests come from your restored profile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Get started
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="tel:+19496030389">Call: (949) 603-0389</a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Timeline connector */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-background z-10"></div>

                <div className="lg:w-1/2 lg:pr-12">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                    <div className="bg-white rounded-xl shadow-md p-4 max-w-sm mx-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Business Performance</h4>
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 6a2 2 0 010-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">Monthly Leads</div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">247</div>
                        <div className="text-xs text-green-600 font-medium">↗ +34% from last month</div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="text-sm text-blue-600 font-medium mb-2">Lead Sources</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Google Search</span>
                            <span className="font-medium">156</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Maps</span>
                            <span className="font-medium">91</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Get started
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+19496030389">Call: (949) 603-0389</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What success looks like section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What success looks like</h2>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].business}</div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={`${testimonials[currentTestimonial].name} - ${testimonials[currentTestimonial].business}`}
                    className="w-full max-w-lg h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-12 space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">
                  {currentTestimonial + 1} / {testimonials.length}
                </span>
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Get started
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+19496030389">Call: (949) 603-0389</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Show the best of your business section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Restore your Business Profile in three simple steps
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Restore your Business Profile in three simple steps.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-medium">
              Start now
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            <div className="text-center space-y-6">
              <div className="text-6xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-2xl font-bold text-gray-900">Diagnose</h3>
              <p className="text-gray-600 leading-relaxed">Identify why your profile was suspended</p>
            </div>

            <div className="text-center space-y-6">
              <div className="text-6xl font-bold text-blue-600 mb-4">2</div>
              <h3 className="text-2xl font-bold text-gray-900">Correct</h3>
              <p className="text-gray-600 leading-relaxed">Update details and gather matching documentation</p>
            </div>

            <div className="text-center space-y-6">
              <div className="text-6xl font-bold text-blue-600 mb-4">3</div>
              <h3 className="text-2xl font-bold text-gray-900">Reinstate</h3>
              <p className="text-gray-600 leading-relaxed">Submit a complete appeal to restore visibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Your questions, answered FAQ section */}
      <section className="bg-gray-50 py-20" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Your questions, answered</h2>
            <button
              onClick={() => setExpandedFaq(null)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
            >
              <span>Collapse all</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg bg-white">
              <button
                onClick={() => setExpandedFaq(expandedFaq === "how-long" ? null : "how-long")}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">How long does it take?</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === "how-long" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === "how-long" && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-4">
                    Most reinstatements resolve in 3–5 business days, but complex cases can take longer.
                  </p>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg bg-white">
              <button
                onClick={() => setExpandedFaq(expandedFaq === "documents" ? null : "documents")}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">What documents do I need?</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === "documents" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === "documents" && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-4">
                    Provide official documents showing the same name/address as your profile (business licence, utility
                    bill, tax letter, or storefront photo).
                  </p>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg bg-white">
              <button
                onClick={() => setExpandedFaq(expandedFaq === "new-profile" ? null : "new-profile")}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">Should I just create a new profile?</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === "new-profile" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === "new-profile" && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-4">
                    No—creating duplicates risks permanent removal. Always reinstate your original listing.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Get started
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+19496030389">Call: (949) 603-0389</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
