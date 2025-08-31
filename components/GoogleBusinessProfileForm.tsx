"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Phone } from "lucide-react"

interface InitialFormData {
  businessName: string
  businessPhone: string
  businessEmail: string
  agreeToTerms: boolean
}

interface VerificationFormData {
  fullName: string
  reviewCount: string
  previousSuspension: string
  caseNumbers: string
  businessAddress: string
  addressVisible: string
  officeType: string
  signagePhotos: FileList | null
  businessDocuments: FileList | null
  utilityBill: FileList | null
  receiptsInvoices: FileList | null
  inventoryPhotos: FileList | null
  vehiclePhoto: FileList | null
  posSystemPhoto: FileList | null
  marketingMaterials: FileList | null
  primaryOwnerEmail: string
  newAdditionalEmail: string
  ownersRemoved: boolean
  suspensionReason: string
  recentChanges: string
  additionalInfo: string
}

const initialData: InitialFormData = {
  businessName: "",
  businessPhone: "",
  businessEmail: "",
  agreeToTerms: false,
}

const initialVerificationData: VerificationFormData = {
  fullName: "",
  reviewCount: "",
  previousSuspension: "",
  caseNumbers: "",
  businessAddress: "",
  addressVisible: "",
  officeType: "",
  signagePhotos: null,
  businessDocuments: null,
  utilityBill: null,
  receiptsInvoices: null,
  inventoryPhotos: null,
  vehiclePhoto: null,
  posSystemPhoto: null,
  marketingMaterials: null,
  primaryOwnerEmail: "",
  newAdditionalEmail: "",
  ownersRemoved: false,
  suspensionReason: "",
  recentChanges: "",
  additionalInfo: "",
}

export default function GoogleBusinessProfileForm() {
  const [showInitial, setShowInitial] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [initialFormData, setInitialFormData] = useState<InitialFormData>(initialData)
  const [verificationFormData, setVerificationFormData] = useState<VerificationFormData>(initialVerificationData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 5

  const updateInitialFormData = (field: keyof InitialFormData, value: any) => {
    setInitialFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateVerificationFormData = (field: keyof VerificationFormData, value: any) => {
    setVerificationFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Submit initial form to Netlify
    try {
      const formData = new FormData()
      formData.append('form-name', 'initial-contact-form')
      formData.append('businessName', initialFormData.businessName)
      formData.append('businessPhone', initialFormData.businessPhone)
      formData.append('businessEmail', initialFormData.businessEmail)
      formData.append('agreeToTerms', initialFormData.agreeToTerms.toString())
      formData.append('timestamp', new Date().toISOString())

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      })

      if (!response.ok) {
        throw new Error("Initial form submission failed")
      }

      // Show loading screen then transition to verification form
      setTimeout(() => {
        setIsLoading(false)
        setShowInitial(false)
      }, 2000)
      
    } catch (error) {
      setIsLoading(false)
      alert("There was an error submitting your information. Please try again or call us at (888) 401-4221.")
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const getNextButtonText = () => {
    switch (currentStep) {
      case 1: return "Next: Location & signage"
      case 2: return "Next: Proof of operations"
      case 3: return "Next: Account setup"
      case 4: return "Next: Suspension details"
      default: return "Next"
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const netlifyFormData = new FormData()
    
    // Add form identification
    netlifyFormData.append('form-name', 'google-business-profile-verification')
    netlifyFormData.append('timestamp', new Date().toISOString())
    
    // Add initial form data (from first form)
    Object.entries(initialFormData).forEach(([key, value]) => {
      netlifyFormData.append(`initial_${key}`, value.toString())
    })

    // Add verification form data
    Object.entries(verificationFormData).forEach(([key, value]) => {
      if (value !== null && typeof value !== 'object') {
        netlifyFormData.append(key, value.toString())
      }
    })

    const fileFields = ['signagePhotos', 'businessDocuments', 'utilityBill', 'receiptsInvoices', 'inventoryPhotos', 'vehiclePhoto', 'posSystemPhoto', 'marketingMaterials']

    fileFields.forEach(field => {
      const files = verificationFormData[field as keyof VerificationFormData] as FileList | null
      if (files) {
        Array.from(files).forEach((file, index) => {
          netlifyFormData.append(`${field}_${index}`, file)
        })
      }
    })

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(netlifyFormData as any).toString()
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      alert("There was an error submitting the form. Please try again or call us at (888) 401-4221.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepTitles = [
    "About your business",
    "Where you operate", 
    "Prove you're actively operating",
    "Account access on Google",
    "What happened?"
  ]

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-3xl shadow-xl overflow-hidden">
        <div className="px-12 py-16 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
              <svg className="w-10 h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Processing Your Information</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We're preparing your personalized reinstatement checklist...
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="bg-blue-600 h-3 rounded-full animate-pulse" style={{ width: "75%" }}></div>
          </div>
          <div className="text-sm text-gray-500">This will only take a moment</div>
        </div>
      </div>
    )
  }

  if (showInitial) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Get Started in 30 Seconds</h3>
            <p className="text-blue-100 text-lg">Tell us about your suspended Google Business Profile</p>
          </div>
        </div>

        {/* Call Now Button for Initial Form */}
        <div className="bg-red-50 border-l-4 border-red-400 px-8 py-4 mb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-sm font-medium text-red-800">
                Need help? Get stuck? Call us now for immediate assistance!
              </span>
            </div>
            <Button
              type="button"
              asChild
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            >
              <a href="tel:+18884014221">📞 Call (888) 401-4221</a>
            </Button>
          </div>
        </div>

        <form 
          name="initial-contact-form"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleInitialSubmit} 
          className="p-8"
        >
          {/* Hidden Netlify form fields */}
          <input type="hidden" name="form-name" value="initial-contact-form" />
          <input type="hidden" name="bot-field" />
          <div className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-3">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                required
                value={initialFormData.businessName}
                onChange={(e) => updateInitialFormData('businessName', e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                placeholder="Enter your business name"
              />
            </div>

            <div>
              <label htmlFor="businessPhone" className="block text-sm font-semibold text-gray-700 mb-3">
                Phone Number *
              </label>
              <input
                type="tel"
                id="businessPhone"
                name="businessPhone"
                required
                value={initialFormData.businessPhone}
                onChange={(e) => updateInitialFormData('businessPhone', e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="businessEmail" className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address *
              </label>
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                required
                value={initialFormData.businessEmail}
                onChange={(e) => updateInitialFormData('businessEmail', e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                placeholder="your@business.com"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <label className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={initialFormData.agreeToTerms}
                  onChange={(e) => updateInitialFormData('agreeToTerms', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 mt-1 flex-shrink-0"
                  required
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I understand that Max Market Pros will review my suspended Google Business Profile and provide guidance on the reinstatement process. I consent to being contacted about my case. *
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={!initialFormData.businessName || !initialFormData.businessPhone || !initialFormData.businessEmail || !initialFormData.agreeToTerms}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-5 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Continue to Assessment →
            </Button>
          </div>
        </form>
      </div>
    )
  }

  // Confirmation screen after successful submission
  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Thanks — we've got it!
            </h1>
            <div className="text-gray-600 space-y-3 max-w-lg mx-auto">
              <p>We'll review your submission and email next steps.</p>
              <p>If we need anything else, we'll reach out to the contact email you provided.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setCurrentStep(3)
              }}
              variant="outline"
              className="px-6 py-3 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg font-medium"
            >
              Upload more documents
            </Button>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setInitialFormData(initialData)
                setVerificationFormData(initialVerificationData)
                setCurrentStep(1)
                setShowInitial(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Start new application
            </Button>
          </div>
        </div>
      </div>
    )
  }

    return (
    <div className="max-w-3xl mx-auto">
      {/* Green Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-xl px-8 py-8 text-white mb-0">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Reinstate Your Google Business Profile</h1>
          <p className="text-green-100 text-lg mb-2">
            Answer a few questions and upload proof your business is real and operating.
          </p>
          <p className="text-green-200 text-sm">
            You can blur or cover account numbers before uploading.
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
          </h2>
          <div className="text-sm font-medium text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Required Fields Notice */}
      <div className="bg-blue-50 border-b border-blue-200 px-8 py-4">
        <p className="text-sm text-blue-800">
          All fields marked with <span className="text-red-500">*</span> are required
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-b-xl shadow-lg overflow-hidden">

              {/* Call Now Button for Verification Form */}
        <div className="bg-red-50 border-l-4 border-red-400 px-6 py-4 mb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">
              Stuck on Step {currentStep}? Call us now for immediate assistance!
            </span>
          </div>
          <Button
            type="button"
            asChild
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            <a href="tel:+18884014221">📞 Call (888) 401-4221</a>
          </Button>
        </div>
      </div>

      <form 
        name="google-business-profile-verification"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleFinalSubmit}
        className="px-6 md:px-8 py-8"
      >
        <input type="hidden" name="form-name" value="google-business-profile-verification" />
        <input type="hidden" name="bot-field" />

        {currentStep === 1 && (
                    <div>
            <div className="mb-6">
              <p className="text-gray-600 text-base">
                We'll start with the basics that appear on Google.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                  <label htmlFor="fullName" className="block text-base font-medium text-gray-900 mb-2">
                    Contact name<span className="text-red-500 ml-1">*</span>
                  </label>
              <input
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    required
                value={verificationFormData.fullName}
                onChange={(e) => updateVerificationFormData('fullName', e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="First & Last"
              />
                  <p className="text-sm text-gray-500 mt-1">We'll use this if we have questions.</p>
            </div>

            <div>
                  <label htmlFor="businessName" className="block text-base font-medium text-gray-900 mb-2">
                    Legal business name<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text" 
                    id="businessName" 
                    name="businessName" 
                    required
                    value={initialFormData.businessName}
                    readOnly
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    placeholder="Exact legal name"
                  />
                  <p className="text-sm text-gray-500 mt-1">Use the name on your registration or tax documents.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessPhone" className="block text-base font-medium text-gray-900 mb-2">
                    Business phone (on Google)<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel" 
                    id="businessPhone" 
                    name="businessPhone" 
                    required
                    value={initialFormData.businessPhone}
                    readOnly
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    placeholder="(555) 123-4567"
                  />
                  <p className="text-sm text-gray-500 mt-1">This should match your Google listing phone.</p>
                </div>

                <div>
                  <label htmlFor="businessEmail" className="block text-base font-medium text-gray-900 mb-2">
                    Email on your Google profile<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email" 
                    id="businessEmail" 
                    name="businessEmail" 
                    required
                    value={initialFormData.businessEmail}
                    readOnly
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    placeholder="you@business.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">Where Google sends profile notifications.</p>
                </div>
              </div>

              <div className="space-y-6 mt-8">
                <div>
                  <label htmlFor="reviewCount" className="block text-base font-medium text-gray-900 mb-2">
                    Approx. number of reviews
                  </label>
              <select
                    id="reviewCount" 
                    name="reviewCount"
                value={verificationFormData.reviewCount}
                onChange={(e) => updateVerificationFormData('reviewCount', e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select range</option>
                    <option value="0-10">0–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-100">51–100</option>
                    <option value="101-500">101–500</option>
                    <option value="500+">500+</option>
              </select>
                  <p className="text-sm text-gray-500 mt-1">An estimate is fine.</p>
            </div>

            <div>
                  <label className="block text-base font-medium text-gray-900 mb-4">
                    Has this profile been suspended before?<span className="text-red-500 ml-1">*</span>
                  </label>
              <div className="space-y-3">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="previousSuspension" 
                        value="no" 
                        checked={verificationFormData.previousSuspension === 'no'} 
                        onChange={(e) => updateVerificationFormData('previousSuspension', e.target.value)} 
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        required
                      />
                      <span className="ml-3 text-base text-gray-900">No</span>
                </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="previousSuspension" 
                        value="yes" 
                        checked={verificationFormData.previousSuspension === 'yes'} 
                        onChange={(e) => updateVerificationFormData('previousSuspension', e.target.value)} 
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        required
                      />
                      <span className="ml-3 text-base text-gray-900">Yes</span>
                </label>
              </div>
            </div>

            {verificationFormData.previousSuspension === 'yes' && (
                  <div className="mt-6">
                    <label htmlFor="caseNumbers" className="block text-base font-medium text-gray-900 mb-2">
                      Previous case numbers / dates
                    </label>
                <textarea
                      id="caseNumbers" 
                      name="caseNumbers"
                  value={verificationFormData.caseNumbers}
                  onChange={(e) => updateVerificationFormData('caseNumbers', e.target.value)}
                  rows={3}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Enter case numbers, dates, and any relevant details"
                />
                    <p className="text-sm text-gray-500 mt-1">If you have them—totally OK to leave blank.</p>
              </div>
            )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 text-base">
                Google checks that businesses are real and reachable.
              </p>
            </div>
            
          <div className="space-y-6">
            <div>
                <label htmlFor="businessAddress" className="block text-base font-medium text-gray-900 mb-2">
                  Business address<span className="text-red-500 ml-1">*</span>
                </label>
              <textarea
                  id="businessAddress" 
                  name="businessAddress" 
                  required
                value={verificationFormData.businessAddress}
                onChange={(e) => updateVerificationFormData('businessAddress', e.target.value)}
                rows={3}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Street, City, State, ZIP"
              />
                <p className="text-sm text-gray-500 mt-1">Use your operating address (not a PO box).</p>
            </div>

            <div>
                <label className="block text-base font-medium text-gray-900 mb-4">
                  Is this address public on Google?<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="addressVisible" 
                      value="yes" 
                      checked={verificationFormData.addressVisible === 'yes'} 
                      onChange={(e) => updateVerificationFormData('addressVisible', e.target.value)} 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-3 text-base text-gray-900">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="addressVisible" 
                      value="no" 
                      checked={verificationFormData.addressVisible === 'no'} 
                      onChange={(e) => updateVerificationFormData('addressVisible', e.target.value)} 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-3 text-base text-gray-900">No</span>
                </label>
              </div>
                <p className="text-sm text-gray-500 mt-1">Service-area businesses often hide their address.</p>
            </div>

            <div>
                <label className="block text-base font-medium text-gray-900 mb-4">
                  Location type<span className="text-red-500 ml-1">*</span>
                  </label>
                <div className="grid grid-cols-1 gap-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                    <input 
                      type="radio" 
                      name="officeType" 
                      value="dedicated" 
                      checked={verificationFormData.officeType === 'dedicated'} 
                      onChange={(e) => updateVerificationFormData('officeType', e.target.value)} 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-3 text-base text-gray-900">Dedicated office / Storefront</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                    <input 
                      type="radio" 
                      name="officeType" 
                      value="home" 
                      checked={verificationFormData.officeType === 'home'} 
                      onChange={(e) => updateVerificationFormData('officeType', e.target.value)} 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-3 text-base text-gray-900">Home office</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                    <input 
                      type="radio" 
                      name="officeType" 
                      value="shared" 
                      checked={verificationFormData.officeType === 'shared'} 
                      onChange={(e) => updateVerificationFormData('officeType', e.target.value)} 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-3 text-base text-gray-900">Shared / Co-working</span>
                  </label>
              </div>
                <p className="text-sm text-gray-500 mt-1">Pick the best fit.</p>
            </div>

              <div className="mt-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <label htmlFor="signagePhotos" className="cursor-pointer">
                    <span className="text-base font-medium text-gray-900">Photos: signage<span className="text-red-500 ml-1">*</span></span>
                    <span className="block text-sm text-gray-600 mt-1">Drag & drop or click to upload</span>
              <input
                      type="file" 
                      id="signagePhotos" 
                      name="signagePhotos" 
                      multiple 
                      accept="image/*,.pdf" 
                      required
                onChange={(e) => updateVerificationFormData('signagePhotos', e.target.files)}
                      className="hidden"
                    />
                  </label>
                  <div className="mt-4 text-sm text-gray-500">
                    <p className="font-medium mb-1">One of the following:</p>
                    <ul className="text-left space-y-1 max-w-md mx-auto">
                      <li>• Storefront sign showing your business name</li>
                      <li>• OR work vehicle with your business name/logo</li>
                    </ul>
                    <p className="mt-3 text-xs">Accepted: JPG/PNG/PDF • Up to 10MB each</p>
                  </div>
                  {verificationFormData.signagePhotos && verificationFormData.signagePhotos.length > 0 && (
                    <div className="mt-4 text-sm text-green-600">
                      {verificationFormData.signagePhotos.length} file(s) uploaded
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 text-base">
                Upload any of the following. More is better.
              </p>
            </div>

            <div className="space-y-8">
              {/* Group A - Business registration */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  🏢 Business registration
                </h3>
                <p className="text-sm text-gray-600 mb-6">Pick one</p>
                
                <div className="space-y-6">
            <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <label htmlFor="businessDocuments" className="cursor-pointer">
                        <span className="text-base font-medium text-gray-900">LLC / DBA / Registration</span>
                        <span className="block text-sm text-gray-600 mt-1">Drag & drop or click to upload</span>
              <input
                          type="file" 
                          id="businessDocuments" 
                          name="businessDocuments" 
                          multiple 
                          accept="image/*,.pdf" 
                onChange={(e) => updateVerificationFormData('businessDocuments', e.target.files)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Name should match your listing.</p>
                      {verificationFormData.businessDocuments && verificationFormData.businessDocuments.length > 0 && (
                        <div className="mt-4 text-sm text-green-600">
                          {verificationFormData.businessDocuments.length} file(s) uploaded
                        </div>
                      )}
                    </div>
            </div>

                  <div className="text-center text-gray-500 font-medium">OR</div>

            <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <label htmlFor="utilityBill" className="cursor-pointer">
                        <span className="text-base font-medium text-gray-900">Utility bill in business name</span>
                        <span className="block text-sm text-gray-600 mt-1">Drag & drop or click to upload</span>
              <input
                          type="file" 
                          id="utilityBill" 
                          name="utilityBill" 
                          multiple 
                          accept="image/*,.pdf" 
                onChange={(e) => updateVerificationFormData('utilityBill', e.target.files)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Shows service address and business name.</p>
                      {verificationFormData.utilityBill && verificationFormData.utilityBill.length > 0 && (
                        <div className="mt-4 text-sm text-green-600">
                          {verificationFormData.utilityBill.length} file(s) uploaded
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </div>

              {/* Group B - Operational proof */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  🛠️ Operational proof
                </h3>
                <p className="text-sm text-gray-600 mb-6">Optional but recommended</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <label htmlFor="receiptsInvoices" className="cursor-pointer">
                        <span className="text-sm font-medium text-gray-900 block">Invoices / receipts</span>
                        <span className="block text-xs text-gray-600 mt-1">Click to upload</span>
              <input
                          type="file" 
                          id="receiptsInvoices" 
                          name="receiptsInvoices" 
                          multiple 
                          accept="image/*,.pdf" 
                onChange={(e) => updateVerificationFormData('receiptsInvoices', e.target.files)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Recent is best; redact prices if you like.</p>
                      {verificationFormData.receiptsInvoices && verificationFormData.receiptsInvoices.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {verificationFormData.receiptsInvoices.length} file(s) uploaded
                        </div>
                      )}
                    </div>
            </div>

                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <label htmlFor="inventoryPhotos" className="cursor-pointer">
                        <span className="text-sm font-medium text-gray-900 block">Equipment / tools photos</span>
                        <span className="block text-xs text-gray-600 mt-1">Click to upload</span>
              <input
                          type="file" 
                          id="inventoryPhotos" 
                          name="inventoryPhotos" 
                          multiple 
                          accept="image/*" 
                onChange={(e) => updateVerificationFormData('inventoryPhotos', e.target.files)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">What you use day-to-day.</p>
                      {verificationFormData.inventoryPhotos && verificationFormData.inventoryPhotos.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {verificationFormData.inventoryPhotos.length} file(s) uploaded
                        </div>
                      )}
                    </div>
            </div>

              <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <label htmlFor="vehiclePhoto" className="cursor-pointer">
                        <span className="text-sm font-medium text-gray-900 block">Branded vehicle</span>
                        <span className="block text-xs text-gray-600 mt-1">Click to upload</span>
                <input
                          type="file" 
                          id="vehiclePhoto" 
                          name="vehiclePhoto" 
                          multiple 
                          accept="image/*" 
                  onChange={(e) => updateVerificationFormData('vehiclePhoto', e.target.files)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">If applicable.</p>
                      {verificationFormData.vehiclePhoto && verificationFormData.vehiclePhoto.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {verificationFormData.vehiclePhoto.length} file(s) uploaded
                        </div>
                      )}
                    </div>
              </div>

              <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <label htmlFor="posSystemPhoto" className="cursor-pointer">
                        <span className="text-sm font-medium text-gray-900 block">POS / cash register / printed receipt</span>
                        <span className="block text-xs text-gray-600 mt-1">Click to upload</span>
                <input
                          type="file" 
                          id="posSystemPhoto" 
                          name="posSystemPhoto" 
                          multiple 
                          accept="image/*" 
                  onChange={(e) => updateVerificationFormData('posSystemPhoto', e.target.files)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">If you take in-person payments.</p>
                      {verificationFormData.posSystemPhoto && verificationFormData.posSystemPhoto.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {verificationFormData.posSystemPhoto.length} file(s) uploaded
                        </div>
                      )}
              </div>
            </div>

                  <div className="md:col-span-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <label htmlFor="marketingMaterials" className="cursor-pointer">
                        <span className="text-sm font-medium text-gray-900 block">Business cards / flyers</span>
                        <span className="block text-xs text-gray-600 mt-1">Click to upload</span>
              <input
                          type="file" 
                          id="marketingMaterials" 
                          name="marketingMaterials" 
                          multiple 
                          accept="image/*,.pdf" 
                onChange={(e) => updateVerificationFormData('marketingMaterials', e.target.files)}
                          className="hidden"
                        />
                      </label>
                      {verificationFormData.marketingMaterials && verificationFormData.marketingMaterials.length > 0 && (
                        <div className="mt-2 text-xs text-green-600">
                          {verificationFormData.marketingMaterials.length} file(s) uploaded
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 text-base">
                This helps prevent delays when Google reviews your case.
              </p>
            </div>

            <div className="space-y-6">
            <div>
                <label htmlFor="primaryOwnerEmail" className="block text-base font-medium text-gray-900 mb-2">
                  Primary owner email (on Google)<span className="text-red-500 ml-1">*</span>
                </label>
              <input
                  type="email" 
                  id="primaryOwnerEmail" 
                  name="primaryOwnerEmail" 
                  required
                value={verificationFormData.primaryOwnerEmail}
                onChange={(e) => updateVerificationFormData('primaryOwnerEmail', e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="owner@business.com"
              />
            </div>

            <div>
                <label htmlFor="newAdditionalEmail" className="block text-base font-medium text-gray-900 mb-2">
                  New additional owner email<span className="text-red-500 ml-1">*</span>
                </label>
              <input
                  type="email" 
                  id="newAdditionalEmail" 
                  name="newAdditionalEmail" 
                  required
                value={verificationFormData.newAdditionalEmail}
                onChange={(e) => updateVerificationFormData('newAdditionalEmail', e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="new-owner@business.com"
              />
                <p className="text-sm text-gray-500 mt-1">Use a brand-new email never used on this profile.</p>
            </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <label className="flex items-start space-x-3">
                <input
                    type="checkbox" 
                    name="ownersRemoved"
                  checked={verificationFormData.ownersRemoved}
                  onChange={(e) => updateVerificationFormData('ownersRemoved', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border border-gray-300 rounded focus:ring-blue-500 mt-1 flex-shrink-0"
                  required
                />
                  <div>
                    <span className="text-base font-medium text-gray-900">
                      I removed any extra managers/owners, leaving only the primary owner and the new email.<span className="text-red-500 ml-1">*</span>
                </span>
                    <p className="text-sm text-gray-600 mt-1">You can re-add others after reinstatement.</p>
                  </div>
              </label>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 text-base">
                A little context helps us pick the right approach.
              </p>
            </div>

            <div className="space-y-6">
            <div>
                <label htmlFor="suspensionReason" className="block text-base font-medium text-gray-900 mb-2">
                  Why do you think your profile was suspended?<span className="text-red-500 ml-1">*</span>
                </label>
              <textarea
                  id="suspensionReason" 
                  name="suspensionReason" 
                  required
                value={verificationFormData.suspensionReason}
                onChange={(e) => updateVerificationFormData('suspensionReason', e.target.value)}
                rows={5}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Ex: changed address last week; signage wasn't visible; category mismatch…"
              />
            </div>

            <div>
                <label htmlFor="recentChanges" className="block text-base font-medium text-gray-900 mb-2">
                  Recent changes to your profile<span className="text-red-500 ml-1">*</span>
                </label>
              <textarea
                  id="recentChanges" 
                  name="recentChanges" 
                  required
                value={verificationFormData.recentChanges}
                onChange={(e) => updateVerificationFormData('recentChanges', e.target.value)}
                rows={4}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Name, address, phone, categories, hours, service area, etc."
              />
                <p className="text-sm text-gray-500 mt-1">Name, address, phone, categories, hours, service area, etc. If none, write 'No recent changes.'</p>
            </div>

            <div>
                <label htmlFor="additionalInfo" className="block text-base font-medium text-gray-900 mb-2">
                  Anything else we should know?
                </label>
              <textarea
                  id="additionalInfo" 
                  name="additionalInfo"
                value={verificationFormData.additionalInfo}
                onChange={(e) => updateVerificationFormData('additionalInfo', e.target.value)}
                rows={4}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Links, timelines, or extra context"
                />
                <p className="text-sm text-gray-500 mt-1">Links, timelines, or extra context.</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <Button
                type="button" 
                variant="outline" 
                onClick={prevStep}
                className="px-6 py-3 text-gray-600 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg font-medium"
              >
                Back
              </Button>
            )}
          </div>

          <div className="flex space-x-4">
            {currentStep < totalSteps ? (
              <Button
                type="button" 
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                {getNextButtonText()}
              </Button>
            ) : (
              <div className="text-right">
                <Button
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Submit application"}
                </Button>
                <p className="text-sm text-gray-500 mt-2">By submitting, you confirm the information is accurate.</p>
              </div>
            )}
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}
