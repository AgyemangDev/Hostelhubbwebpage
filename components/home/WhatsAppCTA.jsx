import Link from "next/link";
import { MessageCircle } from "lucide-react";


export default function WhatsAppCTA() {

  return (

    <section className="max-w-6xl mx-auto px-6 pb-24">

      <div className="rounded-3xl border border-green-200 bg-green-50 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">


        <div className="flex items-start gap-5">

          <div className="rounded-2xl bg-green-600 p-4 text-white">
            <MessageCircle size={32}/>
          </div>


          <div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Join our WhatsApp Community
            </h2>


            <p className="mt-2 text-gray-600 max-w-xl">
              Stay updated with new hostels, campus announcements,
              booking opportunities and student offers.
            </p>

          </div>


        </div>


        <Link
          href="#"
          className="rounded-xl bg-green-600 px-7 py-3 font-semibold text-white hover:bg-green-700 transition"
        >
          Join WhatsApp Channel
        </Link>


      </div>

    </section>

  );

}