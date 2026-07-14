"use client";

import {
  User,
  Phone,
  GraduationCap,
  Users,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const GENDERS = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#9a0b0d] focus:ring-2 focus:ring-[#9a0b0d]/20";

function Field({
  label,
  icon: Icon,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        {children}
      </div>
    </div>
  );
}

export default function ProfileForm({
  form,
  onChange,
  onSubmit,
  loading,
  onBack,
}) {
  const update =
    (field) =>
    (e) =>
      onChange({
        ...form,
        [field]: e.target.value,
      });

  return (
    <>

      <div className="mb-8 flex items-center gap-3">

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Complete your profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            We only need a few details before you can continue.
          </p>
        </div>

      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <Field
            label="First Name"
            icon={User}
          >
            <input
              required
              autoComplete="given-name"
              className={inputClass}
              value={form.first_name}
              onChange={update("first_name")}
            />
          </Field>

          <Field
            label="Surname"
            icon={User}
          >
            <input
              required
              autoComplete="family-name"
              className={inputClass}
              value={form.surname}
              onChange={update("surname")}
            />
          </Field>

        </div>

        <Field
          label="Phone Number"
          icon={Phone}
        >
          <input
            required
            type="tel"
            autoComplete="tel"
            placeholder="0551234567"
            className={inputClass}
            value={form.phone_number}
            onChange={update("phone_number")}
          />
        </Field>

        <Field
          label="Gender"
          icon={Users}
        >
          <select
            required
            className={inputClass}
            value={form.gender}
            onChange={update("gender")}
          >
            <option value="">
              Select Gender
            </option>

            {GENDERS.map((gender) => (
              <option
                key={gender.value}
                value={gender.value}
              >
                {gender.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Institution"
          icon={GraduationCap}
        >
          <input
            required
            autoComplete="organization"
            placeholder="Kwame Nkrumah University of Science and Technology"
            className={inputClass}
            value={form.institution}
            onChange={update("institution")}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#9a0b0d] py-3 font-semibold text-white transition hover:bg-[#7b0809] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Saving...
            </>
          ) : (
            "Complete Profile"
          )}
        </button>

      </form>

    </>
  );
}