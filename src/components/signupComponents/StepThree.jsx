const StepThree = ({
  formData,
  handleFileChange,
  passportPhotoName,
  idCardPhotoName,
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Passport Photo</label>
        <input
          type="file"
          name="passportPhoto"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full"
          required
        />
        {passportPhotoName && (
          <p className="text-xs text-gray-500 mt-1">Selected: {passportPhotoName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Student ID / National ID</label>
        <input
          type="file"
          name="idCardPhoto"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full"
          required
        />
        {idCardPhotoName && (
          <p className="text-xs text-gray-500 mt-1">Selected: {idCardPhotoName}</p>
        )}
      </div>
    </>
  )
}

export default StepThree
