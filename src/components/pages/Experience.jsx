import React, { useEffect, useState } from "react";

import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from "../services/experience.js";

const emptyForm = {
  company_name: "",
  job_title: "",
  employment_type: "",
  location: "",
  start_date: "",
  end_date: "",
  description: "",
  responsibility: [],
  technologies: [],
  is_current: false,
  display_order: 0,
  is_active: true,
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [responsibilityInput, setResponsibilityInput] = useState("");

  const [technologyInput, setTechnologyInput] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // GET EXPERIENCES
  // =========================

  const loadExperiences = async () => {
    try {
      setLoading(true);

      const result = await getExperiences();

      console.log("EXPERIENCE DATA:", result);

      setExperiences(result.data || result.experiences || []);

    } catch (error) {
      console.error("GET EXPERIENCE ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // ADD RESPONSIBILITY
  // =========================

  const addResponsibility = () => {
    const value = responsibilityInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      responsibility: [
        ...prev.responsibility,
        value,
      ],
    }));

    setResponsibilityInput("");
  };

  const removeResponsibility = (index) => {
    setFormData((prev) => ({
      ...prev,
      responsibility: prev.responsibility.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =========================
  // ADD TECHNOLOGY
  // =========================

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      technologies: [
        ...prev.technologies,
        value,
      ],
    }));

    setTechnologyInput("");
  };

  const removeTechnology = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =========================
  // OPEN ADD MODAL
  // =========================

  const openAddModal = () => {
    setEditingId(null);

    setFormData(emptyForm);

    setResponsibilityInput("");

    setTechnologyInput("");

    setShowModal(true);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const openEditModal = (experience) => {
    setEditingId(experience.id);

    setFormData({
      company_name: experience.company_name || "",
      job_title: experience.job_title || "",
      employment_type: experience.employment_type || "",
      location: experience.location || "",
      start_date: experience.start_date
        ? experience.start_date.split("T")[0]
        : "",
      end_date: experience.end_date
        ? experience.end_date.split("T")[0]
        : "",
      description: experience.description || "",
      responsibility: experience.responsibility || [],
      technologies: experience.technologies || [],
      is_current: experience.is_current || false,
      display_order: experience.display_order || 0,
      is_active:
        experience.is_active !== undefined
          ? experience.is_active
          : true,
    });

    setResponsibilityInput("");

    setTechnologyInput("");

    setShowModal(true);
  };

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("EXPERIENCE DATA:", formData);

      let result;

      if (editingId) {
        result = await updateExperience(
          editingId,
          formData
        );
      } else {
        result = await createExperience(formData);
      }

      console.log("EXPERIENCE RESPONSE:", result);

      setShowModal(false);

      setEditingId(null);

      setFormData(emptyForm);

      setResponsibilityInput("");

      setTechnologyInput("");

      await loadExperiences();

    } catch (error) {
      console.error(
        "SAVE EXPERIENCE ERROR:",
        error
      );

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteExperience(id);

      await loadExperiences();

    } catch (error) {
      console.error(
        "DELETE EXPERIENCE ERROR:",
        error
      );

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Experience
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your professional experience
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700"
        >
          + Add Experience
        </button>

      </div>


      {/* EXPERIENCE LIST */}

      {loading && experiences.length === 0 ? (

        <div className="text-center py-20 text-gray-500">
          Loading...
        </div>

      ) : experiences.length === 0 ? (

        <div className="bg-white border rounded-2xl p-12 text-center">

          <h2 className="text-xl font-semibold">
            No Experience Added
          </h2>

          <p className="text-gray-500 mt-2">
            Add your professional experience.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {experiences.map((experience) => (

            <div
              key={experience.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {experience.job_title}
                  </h2>

                  <p className="text-purple-600 font-semibold mt-1">
                    {experience.company_name}
                  </p>

                  <p className="text-gray-500 mt-1">
                    {experience.location}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      openEditModal(experience)
                    }
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(experience.id)
                    }
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    Delete
                  </button>

                </div>

              </div>


              <div className="mt-4 text-sm text-gray-500">

                {experience.start_date?.split("T")[0]}

                {" — "}

                {experience.is_current
                  ? "Present"
                  : experience.end_date?.split("T")[0]}

                {" • "}

                {experience.employment_type}

              </div>


              {experience.description && (

                <p className="mt-4 text-gray-600">
                  {experience.description}
                </p>

              )}


              {experience.responsibility?.length > 0 && (

                <div className="mt-5">

                  <h3 className="font-semibold mb-2">
                    Responsibilities
                  </h3>

                  <ul className="list-disc ml-5 text-gray-600 space-y-1">

                    {experience.responsibility.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )}

                  </ul>

                </div>

              )}


              {experience.technologies?.length > 0 && (

                <div className="flex flex-wrap gap-2 mt-5">

                  {experience.technologies.map(
                    (tech, index) => (

                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm"
                      >
                        {tech}
                      </span>

                    )
                  )}

                </div>

              )}

            </div>

          ))}

        </div>

      )}


      {/* ========================= */}
      {/* MODAL */}
      {/* ========================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5">

          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

            {/* MODAL HEADER */}

            <div className="flex justify-between items-center px-8 py-6 border-b">

              <div>

                <h2 className="text-2xl font-bold">
                  {editingId
                    ? "Edit Experience"
                    : "Experience Information"}
                </h2>

                <p className="text-gray-500 mt-1">
                  Add your professional experience
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-8 space-y-6"
            >

              {/* COMPANY + JOB TITLE */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block mb-2 font-medium">
                    Company Name
                  </label>

                  <input
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="e.g. Google"
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  />

                </div>


                <div>

                  <label className="block mb-2 font-medium">
                    Job Title
                  </label>

                  <input
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  />

                </div>

              </div>


              {/* EMPLOYMENT + LOCATION */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block mb-2 font-medium">
                    Employment Type
                  </label>

                  <select
                    name="employment_type"
                    value={formData.employment_type}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  >

                    <option value="">
                      Select employment type
                    </option>

                    <option value="Full-time">
                      Full-time
                    </option>

                    <option value="Part-time">
                      Part-time
                    </option>

                    <option value="Internship">
                      Internship
                    </option>

                    <option value="Contract">
                      Contract
                    </option>

                    <option value="Freelance">
                      Freelance
                    </option>

                  </select>

                </div>


                <div>

                  <label className="block mb-2 font-medium">
                    Location
                  </label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Indore, India"
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  />

                </div>

              </div>


              {/* DATES */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block mb-2 font-medium">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  />

                </div>


                <div>

                  <label className="block mb-2 font-medium">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    disabled={formData.is_current}
                    className="w-full border rounded-xl px-4 py-3 disabled:bg-gray-100"
                  />

                </div>

              </div>


              {/* CURRENT */}

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  name="is_current"
                  checked={formData.is_current}
                  onChange={handleChange}
                  className="w-4 h-4"
                />

                <span>
                  I currently work here
                </span>

              </label>


              {/* DESCRIPTION */}

              <div>

                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your role and achievements..."
                  className="w-full border rounded-xl px-4 py-3 resize-none"
                />

              </div>


              {/* RESPONSIBILITIES */}

              <div>

                <label className="block mb-2 font-medium">
                  Responsibilities
                </label>

                <div className="flex gap-3">

                  <input
                    value={responsibilityInput}
                    onChange={(e) =>
                      setResponsibilityInput(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addResponsibility();
                      }
                    }}
                    placeholder="e.g. Developed REST APIs"
                    className="flex-1 border rounded-xl px-4 py-3"
                  />

                  <button
                    type="button"
                    onClick={addResponsibility}
                    className="px-5 rounded-xl bg-purple-100 text-purple-600"
                  >
                    Add
                  </button>

                </div>


                <div className="flex flex-wrap gap-2 mt-3">

                  {formData.responsibility.map(
                    (item, index) => (

                      <span
                        key={index}
                        className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg flex items-center gap-2"
                      >

                        {item}

                        <button
                          type="button"
                          onClick={() =>
                            removeResponsibility(index)
                          }
                        >
                          ×
                        </button>

                      </span>

                    )
                  )}

                </div>

              </div>


              {/* TECHNOLOGIES */}

              <div>

                <label className="block mb-2 font-medium">
                  Technologies
                </label>

                <div className="flex gap-3">

                  <input
                    value={technologyInput}
                    onChange={(e) =>
                      setTechnologyInput(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                    placeholder="e.g. React.js"
                    className="flex-1 border rounded-xl px-4 py-3"
                  />

                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-5 rounded-xl bg-blue-100 text-blue-600"
                  >
                    Add
                  </button>

                </div>


                <div className="flex flex-wrap gap-2 mt-3">

                  {formData.technologies.map(
                    (tech, index) => (

                      <span
                        key={index}
                        className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2"
                      >

                        {tech}

                        <button
                          type="button"
                          onClick={() =>
                            removeTechnology(index)
                          }
                        >
                          ×
                        </button>

                      </span>

                    )
                  )}

                </div>

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-4 pt-5 border-t">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-6 py-3 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 bg-purple-600 text-white rounded-xl font-semibold disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingId
                    ? "Update Experience"
                    : "Save Experience"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Experience;