import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  X,
  Save,
} from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    project_type: "",
    role: [],
    team_project: false,
    technologies: [],
    github_url: "",
    live_url: "",
    image_url: "",
    is_active: true,
    display_order: 1,
  });

  const [roleInput, setRoleInput] = useState("");
  const [technologyInput, setTechnologyInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addRole = () => {
    if (!roleInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      role: [...prev.role, roleInput.trim()],
    }));

    setRoleInput("");
  };

  const removeRole = (index) => {
    setFormData((prev) => ({
      ...prev,
      role: prev.role.filter((_, i) => i !== index),
    }));
  };

  const addTechnology = () => {
    if (!technologyInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, technologyInput.trim()],
    }));

    setTechnologyInput("");
  };

  const removeTechnology = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      project_type: "",
      role: [],
      team_project: false,
      technologies: [],
      github_url: "",
      live_url: "",
      image_url: "",
      is_active: true,
      display_order: 1,
    });

    setRoleInput("");
    setTechnologyInput("");
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingId(project.id);

    setFormData({
      name: project.name || "",
      description: project.description || "",
      start_date: project.start_date
        ? project.start_date.split("T")[0]
        : "",
      end_date: project.end_date
        ? project.end_date.split("T")[0]
        : "",
      project_type: project.project_type || "",
      role: project.role || [],
      team_project: project.team_project || false,
      technologies: project.technologies || [],
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      image_url: project.image_url || "",
      is_active: project.is_active ?? true,
      display_order: project.display_order || 1,
    });

    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*
        Yahan apni create/update API call laga dena.

        Example:

        if (editingId) {
          await updateProjectApi(editingId, formData);
        } else {
          await createProjectApi(formData);
        }
      */

      toast.success(
        editingId
          ? "Project updated successfully"
          : "Project created successfully"
      );

      setShowModal(false);
      resetForm();

      // API ke baad dobara projects fetch karna.
      // fetchProjects();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      /*
        await deleteProjectApi(id);
        fetchProjects();
      */

      setProjects((prev) => prev.filter((project) => project.id !== id));

      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete project");
    }
  };

  return (
    <div className="min-h-full bg-[#f8f9fc] px-6 py-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Projects
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your portfolio projects
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#4f36e5] hover:bg-[#432bc7] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        {projects.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
              <ImageIcon
                size={25}
                className="text-[#4f36e5]"
              />
            </div>

            <h3 className="text-gray-800 font-medium">
              No projects yet
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Add your first project to your portfolio.
            </p>

            <button
              onClick={openAddModal}
              className="mt-5 bg-[#4f36e5] text-white px-4 py-2 rounded-lg text-sm"
            >
              Add Project
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-5 flex items-center gap-5 hover:bg-gray-50 transition"
              >

                {/* IMAGE */}
                <div className="w-28 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon
                        size={25}
                        className="text-gray-400"
                      />
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold text-gray-900">
                      {project.name}
                    </h2>

                    {project.project_type && (
                      <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#4f36e5] text-xs">
                        {project.project_type}
                      </span>
                    )}

                    {project.team_project && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs">
                        Team
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {project.description}
                  </p>

                  {/* TECHNOLOGIES */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies?.slice(0, 5).map(
                      (technology, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>

                </div>

                {/* LINKS */}
                <div className="flex items-center gap-2 shrink-0">

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#4f36e5] hover:border-purple-200"
                      title="View Repository"
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}

                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#4f36e5] hover:border-purple-200"
                      title="Live Project"
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}

                  <button
                    onClick={() => openEditModal(project)}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#4f36e5]"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">

          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? "Edit Project" : "Add Project"}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Add project details for your portfolio
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* NAME */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Cloud Media Storage"
                  className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your project..."
                  className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-none focus:border-[#4f36e5]"
                  required
                />
              </div>

              {/* DATES */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                  />
                </div>

              </div>

              {/* PROJECT TYPE */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Project Type
                </label>

                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                >
                  <option value="">Select project type</option>
                  <option value="Personal">Personal</option>
                  <option value="College">College</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Professional">Professional</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>

              {/* TEAM PROJECT */}
              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  name="team_project"
                  checked={formData.team_project}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#4f36e5]"
                />

                <span className="text-sm text-gray-700">
                  This is a team project
                </span>

              </label>

              {/* ROLE */}
              <div>

                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>

                <div className="flex gap-2 mt-2">

                  <input
                    value={roleInput}
                    onChange={(e) =>
                      setRoleInput(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addRole();
                      }
                    }}
                    placeholder="e.g. Full Stack Developer"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                  />

                  <button
                    type="button"
                    onClick={addRole}
                    className="px-4 rounded-lg bg-gray-100 text-sm"
                  >
                    Add
                  </button>

                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.role.map((role, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-purple-50 text-[#4f36e5] px-3 py-1.5 rounded-md text-xs"
                    >
                      {role}

                      <button
                        type="button"
                        onClick={() => removeRole(index)}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>

              </div>

              {/* TECHNOLOGIES */}
              <div>

                <label className="text-sm font-medium text-gray-700">
                  Technologies
                </label>

                <div className="flex gap-2 mt-2">

                  <input
                    value={technologyInput}
                    onChange={(e) =>
                      setTechnologyInput(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                    placeholder="e.g. React"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                  />

                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-4 rounded-lg bg-gray-100 text-sm"
                  >
                    Add
                  </button>

                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.technologies.map(
                    (technology, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-xs"
                      >
                        {technology}

                        <button
                          type="button"
                          onClick={() =>
                            removeTechnology(index)
                          }
                        >
                          <X size={13} />
                        </button>
                      </span>
                    )
                  )}
                </div>

              </div>

              {/* URLS */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Repository URL
                  </label>

                  <input
                    type="url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Live URL
                  </label>

                  <input
                    type="url"
                    name="live_url"
                    value={formData.live_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                  />
                </div>

              </div>

              {/* IMAGE URL */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                />
              </div>

              {/* DISPLAY ORDER + ACTIVE */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleChange}
                    min="1"
                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#4f36e5]"
                  />
                </div>

                <label className="flex items-center gap-3 mt-8 cursor-pointer">

                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#4f36e5]"
                  />

                  <span className="text-sm text-gray-700">
                    Active project
                  </span>

                </label>

              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#4f36e5] text-white rounded-lg text-sm font-medium"
                >
                  <Save size={17} />

                  {editingId
                    ? "Update Project"
                    : "Save Project"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;