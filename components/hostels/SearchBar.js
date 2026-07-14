"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { UNIVERSITIES } from "../lib/universities";

const SearchBar = () => {
  const router = useRouter();
  const [institution, setInstitution] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (institution) params.set("institution", institution);
    if (query) params.set("q", query);
    router.push(`/hostels?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row gap-2 bg-paper-raised rounded-card border border-line shadow-lg p-2 w-full max-w-xl"
    >
      <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-2xl bg-paper">
        <MapPin size={18} className="text-maroon shrink-0" />
        <select
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className="bg-transparent w-full text-sm font-medium text-ink outline-none"
          aria-label="Choose your university"
        >
          <option value="">Any university</option>
          {UNIVERSITIES.map((u) => (
            <option key={u.slug} value={u.name}>
              {u.name} — {u.city}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-2xl bg-paper">
        <Search size={18} className="text-ink-soft shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hostel name or area, e.g. Ayeduase"
          className="bg-transparent w-full text-sm outline-none placeholder:text-ink-soft/60"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 rounded-2xl bg-maroon text-white font-semibold text-sm hover:bg-maroon-dark transition-colors"
      >
        Search hostels
      </button>
    </form>
  );
};

export default SearchBar;
