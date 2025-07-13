import { Card,CardContent } from "./Card"
import { Badge } from "./badge"
import {
  UserPlus,
  Search,
  CreditCard,
  CheckCircle,
  Receipt,
  Package,
  MapPin,
  FileText,
  Truck,
  Heart,
  Building,
  Calendar,
  Shield,
} from "lucide-react"

export default function HowToUseGuide() {
  const accommodationSteps = [
    {
      step: 1,
      icon: <UserPlus className="w-8 h-8" />,
      title: "Create Your Account",
      description: "Sign up with your personal information and select your institution to get started with HostelHubb.",
      color: "bg-blue-500",
    },
    {
      step: 2,
      icon: <Search className="w-8 h-8" />,
      title: "Browse Available Hostels",
      description: "Explore various hostels and accommodations that match your preferences and budget.",
      color: "bg-purple-500",
    },
    {
      step: 3,
      icon: <Heart className="w-8 h-8" />,
      title: "Express Interest",
      description: "Reserve only the hostels you're truly interested in and ready to commit to. Multiple bookings are allowed.",
      color: "bg-pink-500",
    },
    {
      step: 4,
      icon: <CreditCard className="w-8 h-8" />,
      title: "Pay Subscription Fee",
      description: "Make a one-time payment for semi-annual access to the platform and its features.",
      color: "bg-green-500",
    },
    {
      step: 5,
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Await Approval",
      description: "Hostel managers will review your request and accept or decline based on availability.",
      color: "bg-orange-500",
    },
{
  step: 6,
  icon: <Receipt className="w-8 h-8" />,
  title: "Complete Payment",
  description: "If approved, make direct payment to the hostel manager within 24 hours and receive your HostelHubb receipt.",
  color: "bg-red-500",
},

  ]

  const storageSteps = [
    {
      step: 1,
      icon: <Package className="w-8 h-8" />,
      title: "Select Items",
      description: "Choose the items you want to store safely with our secure storage service.",
      color: "bg-indigo-500",
    },
    {
      step: 2,
      icon: <MapPin className="w-8 h-8" />,
      title: "Choose Pickup Point",
      description: "Select a convenient pickup location at any of the available halls on campus.",
      color: "bg-teal-500",
    },
    {
      step: 3,
      icon: <FileText className="w-8 h-8" />,
      title: "Review Terms",
      description: "Carefully read and agree to our terms and conditions for storage services.",
      color: "bg-amber-500",
    },
    {
      step: 4,
      icon: <CreditCard className="w-8 h-8" />,
      title: "Make Payment",
      description: "Complete your payment for the storage service to confirm your booking.",
      color: "bg-emerald-500",
    },
    {
      step: 5,
      icon: <Truck className="w-8 h-8" />,
      title: "Item Collection",
      description: "Our storage facilitators will collect your items and deliver them safely to storage.",
      color: "bg-violet-500",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-sm font-medium px-4 py-2">
          How It Works
        </Badge>
        <h2 className="text-4xl font-bold tracking-tight">
          Your Journey with <span className="text-red-600">HostelHubb</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how easy it is to find accommodation and storage solutions. Follow our simple step-by-step process to
          get started today.
        </p>
      </div>

      {/* Accommodation Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Building className="w-8 h-8 text-red-600" />
            <h3 className="text-3xl font-bold">Accommodation Booking</h3>
          </div>
          <p className="text-lg text-muted-foreground">
            Find and secure your perfect hostel accommodation in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodationSteps.map((step, index) => (
            <Card
              key={step.step}
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`${step.color} text-white p-3 rounded-full flex-shrink-0`}>{step.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {step.step.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold">{step.title}</h4>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                {index < accommodationSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Storage Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Package className="w-8 h-8 text-red-600" />
            <h3 className="text-3xl font-bold">Storage Services</h3>
          </div>
          <p className="text-lg text-muted-foreground">
            Secure storage solutions with convenient pickup and delivery services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {storageSteps.map((step, index) => (
            <Card
              key={step.step}
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="text-center space-y-4">
                  <div className={`${step.color} text-white p-4 rounded-full mx-auto w-fit`}>{step.icon}</div>
                  <div className="space-y-2">
                    <span className="text-2xl font-bold text-muted-foreground block">
                      {step.step.toString().padStart(2, "0")}
                    </span>
                    <h4 className="text-lg font-semibold">{step.title}</h4>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-center text-sm">{step.description}</p>
                {index < storageSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
