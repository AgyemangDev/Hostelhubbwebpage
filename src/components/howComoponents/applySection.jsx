import { X } from 'lucide-react'
import React from 'react'


export const ApplySection = () => {
    const Link = ({ href, children }) => (
  <a href={href} clazssName="inline-block">{children}</a>
);
  return (
    <>
      
      <div className="w-full bg-gradient-to-r from-[#610b0c] to-[#912c2d] py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Join our affiliate program today and turn your influence into income.
          </p>
          
          <div className="space-y-2">
            <Link href="/affiliate-page
            ">
              <button className="bg-white text-[#610b0c] text-lg font-semibold px-10 py-4 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 transform w-full sm:w-auto">
                Apply Now
              </button>
            </Link>
            
            <p className="text-white/80 mt-6">
              Applications are reviewed within 24-48 hours
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            <div className="flex items-start">
              <div className="text-white mr-2 mt-1">✓</div>
              <span className="text-white/90 text-sm">No application or monthly fees</span>
            </div>
            <div className="flex items-start">
              <div className="text-white mr-2 mt-1">✓</div>
              <span className="text-white/90 text-sm">Dedicated affiliate support team</span>
            </div>
            <div className="flex items-start">
              <div className="text-white mr-2 mt-1">✓</div>
              <span className="text-white/90 text-sm">Monthly payments with no minimum</span>
            </div>
            <div className="flex items-start">
              <div className="text-white mr-2 mt-1">✓</div>
              <span className="text-white/90 text-sm">Comprehensive marketing materials</span>
            </div>
          </div>
          
          <p className="text-white/80 mt-8">
            Questions? Contact our affiliate team at <span className="underline">affiliates@example.com</span>
          </p>
        </div>
      </div>
    </>
  )
}
