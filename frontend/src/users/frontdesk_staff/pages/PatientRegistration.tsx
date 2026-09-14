import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import api from "../../../lib/axios";

type PatientRegistrationProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadData: () => Promise<void>;
  loading: boolean;
};

function PatientRegistration({
  open,
  setOpen,
  loadData,
  loading,
}: PatientRegistrationProps) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [bloodType, setBloodType] = useState("");

  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Profile photo must be smaller than 5MB.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function resetForm() {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setSuffix("");
    setSex("");
    setBirthdate("");
    setCivilStatus("");
    setBloodType("");
    setContactNumber("");
    setEmail("");
    setAddress("");
    setEmergencyContactName("");
    setEmergencyContact("");
    removePhoto();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !sex ||
      !birthdate ||
      !email ||
      !contactNumber ||
      !address
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("sex", sex);
      formData.append("birthdate", birthdate);
      formData.append("email", email);
      formData.append("contact_number", contactNumber);
      formData.append("address", address);

      if (middleName) formData.append("middle_name", middleName);
      if (suffix) formData.append("suffix", suffix);
      if (civilStatus) formData.append("civil_status", civilStatus);
      if (bloodType) formData.append("blood_type", bloodType);
      if (emergencyContactName)
        formData.append("emergency_contact_name", emergencyContactName);
      if (emergencyContact)
        formData.append("emergency_contact", emergencyContact);
      if (image) formData.append("image", image);

      const response = await api.post("/api/fdstaff/patients", formData);
      alert(response.data.message);

      resetForm();
      await loadData();
    } catch (error: unknown) {
      alert(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Something went wrong",
      );
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full border border-gray-300 p-2 text-sm focus:border-gray-900 focus:outline-none";
  const labelClass = "mb-1 block text-xs text-gray-500";

  return (
    <main className="flex-1 min-w-0">
      <Header
        loading={loading}
        open={open}
        setOpen={setOpen}
        loadData={loadData}
        page="Patient Registration"
      />

      <div className="w-full px-6">
        <h2 className="mb-8 text-xl font-medium">Patient Registration</h2>

        <form onSubmit={handleSubmit} className="w-full space-y-10">
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
            {/* LEFT — PHOTO + PERSONAL */}
            <div className="space-y-10 lg:col-span-2">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-50">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Patient preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Photo</span>
                  )}
                </div>

                <div className="space-y-1">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="block text-sm"
                  />
                  {image && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-xs text-gray-500 hover:text-gray-900"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-medium text-gray-900">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-3">
                  <div>
                    <label className={labelClass}>First name</label>
                    <input
                      className={inputClass}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Middle name</label>
                    <input
                      className={inputClass}
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last name</label>
                    <input
                      className={inputClass}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Suffix</label>
                    <input
                      className={inputClass}
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Sex</label>
                    <select
                      className={inputClass}
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Birthdate</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Civil status</label>
                    <select
                      className={inputClass}
                      value={civilStatus}
                      onChange={(e) => setCivilStatus(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Blood type</label>
                    <input
                      className={inputClass}
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — CONTACT + EMERGENCY */}
            <div className="space-y-10">
              <div>
                <h3 className="mb-4 text-sm font-medium text-gray-900">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Contact number</label>
                    <input
                      className={inputClass}
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Address</label>
                    <textarea
                      rows={3}
                      className={`${inputClass} resize-none`}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-medium text-gray-900">
                  Emergency Contact
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input
                      className={inputClass}
                      value={emergencyContactName}
                      onChange={(e) => setEmergencyContactName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Number</label>
                    <input
                      className={inputClass}
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900"
              disabled={submitting}
            >
              Clear
            </button>
            <button
              type="submit"
              className="border border-gray-900 px-5 py-2 text-sm text-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-40"
              disabled={submitting}
            >
              {submitting ? "Registering…" : "Register patient"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default PatientRegistration;
