"use client"

import { useEffect, useState } from "react"
import { Loader2, ExternalLink, Download } from "lucide-react"
import { useParams } from "react-router-dom"

const primaryBlue = "rgb(3, 100, 165)"
const primaryBlueLight = "rgba(3, 100, 165, 0.1)"

export default function HostelRedirect() {
  const [countdown, setCountdown] = useState(3)
  const [redirectStatus, setRedirectStatus] = useState("initializing") // initializing, redirecting, failed
  const [fallbackUrl, setFallbackUrl] = useState("")
  // Get hostelId from URL parameters
  const { hostelId } = useParams()

  useEffect(() => {
    // Use the hostelId from URL parameters instead of query params
    const isAndroid = /android/i.test(navigator.userAgent)
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)

    const generatedFallbackUrl = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb"
      : "https://apps.apple.com/us/app/hostelhubb/id6738483533"

    setFallbackUrl(generatedFallbackUrl)

    let fallbackTimeout = null

    // Start countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          // If app hasn't opened yet, go to store
          if (redirectStatus !== "redirecting") {
            window.location.href = generatedFallbackUrl
            setRedirectStatus("failed")
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Try to open the app after slight delay
    setTimeout(() => {
      if (!hostelId) {
        setRedirectStatus("failed")
        return
      }

      const deepLink = `hostelhubb://hostel/${hostelId}`
      setRedirectStatus("redirecting")
      console.log("Attempting to open app with deep link:", deepLink)

      // Detect blur (app opened)
      window.addEventListener("blur", function onBlur() {
        clearTimeout(fallbackTimeout)
        window.removeEventListener("blur", onBlur)
      })

      // Attempt to open app
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      iframe.src = deepLink
      document.body.appendChild(iframe)

      fallbackTimeout = setTimeout(() => {
        document.body.removeChild(iframe)
        setRedirectStatus("failed")
      }, 1500)

      // Backup method
      window.location.href = deepLink
    }, 1000)

    return () => {
      clearInterval(countdownInterval)
      clearTimeout(fallbackTimeout)
    }
  }, [hostelId, redirectStatus])

  // Handle manual redirect to app store
  const goToAppStore = () => {
    window.location.href = fallbackUrl
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: primaryBlueLight }}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-5" style={{ backgroundColor: primaryBlue }}>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">HostelHubb</h1>
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Download className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="border-t border-b border-gray-100 py-4 my-4">
            {redirectStatus === "initializing" && (
              <div className="flex flex-col items-center">
                <p className="text-center mb-2">Preparing to open HostelHubb app...</p>
                <div className="text-sm text-gray-500">Redirecting in {countdown} seconds</div>
              </div>
            )}

            {redirectStatus === "redirecting" && (
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin mb-2" style={{ color: primaryBlue }} />
                <p className="text-center font-medium" style={{ color: primaryBlue }}>
                  Opening HostelHubb app...
                </p>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  If nothing happens, you may not have the app installed
                </p>
              </div>
            )}

            {redirectStatus === "failed" && (
              <div className="flex flex-col items-center">
                <p className="text-center mb-3">We couldn't open the HostelHubb app</p>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Please install the app to continue with your booking
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <button
              onClick={goToAppStore}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: primaryBlue }}
            >
              <ExternalLink className="h-4 w-4" />
              Download HostelHubb App
            </button>

            <div className="mt-4 text-xs text-center text-gray-400">
              Get the best deals and exclusive offers on the app
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Powered by HostelHubb | © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </div>
  )
}

