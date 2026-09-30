import { useState } from "react";

const Education = () => {
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    field: "",
    start_year: "",
    end_year: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      start_year: Number(formData.start_year),
      end_year: Number(formData.end_year),
    };

    console.log(payload);

    // axios.post("/api/education", payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Add Education
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add your educational background to your portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Education Information */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Education Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Degree */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Degree
                </label>

                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-purple-500"
                  required
                />
              </div>

              {/* Institution */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Institution
                </label>

                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="e.g. ABC University"
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-purple-500"
                  required
                />
              </div>

              {/* Field */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Field of Study
                </label>

                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-purple-500"
                />
              </div>

              {/* Start Year */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Start Year
                </label>

                <input
                  type="number"
                  name="start_year"
                  value={formData.start_year}
                  onChange={handleChange}
                  placeholder="e.g. 2020"
                  min="1950"
                  max="2100"
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-purple-500"
                  required
                />
              </div>

              {/* End Year */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  End Year
                </label>

                <input
                  type="number"
                  name="end_year"
                  value={formData.end_year}
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                  min="1950"
                  max="2100"
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-purple-500"
                  required
                />
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold">
              Description
            </h2>

            <label className="mb-2 block text-sm font-medium">
              About Education
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Add relevant coursework, achievements, projects, etc."
              className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-purple-500"
            />

            <p className="mt-2 text-xs text-gray-500">
              Keep it concise and relevant to your career.
            </p>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              className="rounded-lg border bg-white px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-2.5 font-medium text-white hover:bg-purple-700"
            >
              Save Education
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Education;