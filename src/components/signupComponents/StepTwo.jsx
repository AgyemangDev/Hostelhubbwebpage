const StepTwo = ({ formData, handleInputChange }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Program of Study</label>
        <input
          type="text"
          name="program"
          value={formData.program}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#610b0c] focus:ring-[#610b0c]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Academic Year</label>
        <input
          type="text"
          name="currentYear"
          value={formData.currentYear}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#610b0c] focus:ring-[#610b0c]"
          placeholder="e.g., Level 200"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#610b0c] focus:ring-[#610b0c]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#610b0c] focus:ring-[#610b0c]"
            required
          />
        </div>
      </div>
    </>
  )
}

export default StepTwo
