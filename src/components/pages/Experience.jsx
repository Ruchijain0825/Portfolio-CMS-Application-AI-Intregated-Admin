import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Briefcase,
  MapPin,
  CalendarDays,
  Plus,
  X,
  Save,
  Trash2,
} from "lucide-react";

const Experience = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    employment_type: "Full-time",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
    responsibility: [],
    technologies: [],
  });

  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [technologyInput, setTechnologyInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addResponsibility = () => {
    const value = responsibilityInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      responsibility: [...prev.responsibility, value],
    }));

    setResponsibilityInput("");
  };

  const removeResponsibility = (index) => {
    setFormData((prev) => ({
      ...prev,
      responsibility: prev.responsibility.filter((_, i) => i !== index),
    }));
  };

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, value],
    }));

    setTechnologyInput("");
  };

  const removeTechnology = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.company_name ||
      !formData.job_title ||
      !formData.location ||
      !formData.start_date
    ) {
      toast.error("Please fill the required fields");
      return;
    }

    try {
      console.log("EXPERIENCE DATA:", formData);

      // API yahan call karna hai
      // await createExperienceApi(formData);

      toast.success("Experience saved successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-full bg-[#f8f9fc] px-6 py-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Experience
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Add and manage your professional experience
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-[#5135e5] hover:bg-[#4327d0] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Save size={17} />
          Save Experience
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        
        {/* Section Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f0edff] flex items-center justify-center">
              <Briefcase size={20} className="text-[#5135e5]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Professional Experience
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Enter your employment details
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-5">

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>

              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="e.g. DXC Technology"
                className="w-full h-11 px-3.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-700 focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>

              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                className="w-full h-11 px-3.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-700 focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type
              </label>

              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="w-full h-11 px-3.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-700 bg-white focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Indore, India"
                  className="w-full h-11 pl-10 pr-3.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-700 focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
                />
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full h-11 pl-10 pr-3.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-700 focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
                />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full h-11 pl-10 pr-3.5 border border-gray-200 rounded-lg outline-none text-sm text-gray-700 focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your role and experience..."
              className="w-full px-3.5 py-3 border border-gray-200 rounded-lg outline-none resize-none text-sm text-gray-700 focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
            />
          </div>

          {/* Responsibilities */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsibilities
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={responsibilityInput}
                onChange={(e) => setResponsibilityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addResponsibility();
                  }
                }}
                placeholder="e.g. Developed REST APIs using Node.js"
                className="flex-1 h-11 px-3.5 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
              />

              <button
                type="button"
                onClick={addResponsibility}
                className="h-11 px-4 flex items-center gap-2 rounded-lg bg-[#f0edff] text-[#5135e5] text-sm font-medium hover:bg-[#e7e2ff]"
              >
                <Plus size={17} />
                Add
              </button>
            </div>

            {formData.responsibility.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.responsibility.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">
                      {item}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={technologyInput}
                onChange={(e) => setTechnologyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
                placeholder="e.g. React.js"
                className="flex-1 h-11 px-3.5 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#5135e5] focus:ring-2 focus:ring-[#5135e5]/10"
              />

              <button
                type="button"
                onClick={addTechnology}
                className="h-11 px-4 flex items-center gap-2 rounded-lg bg-[#f0edff] text-[#5135e5] text-sm font-medium hover:bg-[#e7e2ff]"
              >
                <Plus size={17} />
                Add
              </button>
            </div>

            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.technologies.map((technology, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0edff] text-[#5135e5] text-sm"
                  >
                    <span>{technology}</span>

                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Save */}
          <div className="flex justify-end mt-7 pt-5 border-t border-gray-100">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#5135e5] hover:bg-[#4327d0] text-white text-sm font-medium transition"
            >
              <Save size={17} />
              Save Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Experience;