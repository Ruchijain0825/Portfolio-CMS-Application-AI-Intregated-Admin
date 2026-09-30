import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Pencil,
  Trash2,
  ExternalLink,
  Plus,
  X,
} from "lucide-react";

import {
  getSkillsApi,
  createSkillApi,
  updateSkillApi,
  deleteSkillApi,
} from "../services/skillapi";

const initialForm = {
  name: "",
  category: "Frontend",
  proficiency: "Beginner",
  experience_years: "",
  icon_url: "",
  display_order: "",
  is_active: true,
};

// ======================================================
// SKILL MODAL
// ======================================================

const SkillModal = ({
  isOpen,
  onClose,
  form,
  handleChange,
  handleSubmit,
  editingId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId ? "Edit Skill" : "Add Skill"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingId
                ? "Update your technical skill"
                : "Add a technical skill to your portfolio"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="max-h-[70vh] overflow-y-auto p-6">

            <div className="grid gap-5 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Skill Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. React.js"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Programming">Programming</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Proficiency */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Proficiency
                </label>

                <select
                  name="proficiency"
                  value={form.proficiency}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">
                    Intermediate
                  </option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Experience (Years)
                </label>

                <input
                  type="number"
                  name="experience_years"
                  value={form.experience_years}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  placeholder="e.g. 2"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-500"
                />
              </div>

              {/* Icon URL */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Icon URL
                </label>

                <input
                  type="url"
                  name="icon_url"
                  value={form.icon_url}
                  onChange={handleChange}
                  placeholder="https://cdn.simpleicons.org/react"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-500"
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Display Order
                </label>

                <input
                  type="number"
                  name="display_order"
                  value={form.display_order}
                  onChange={handleChange}
                  min="1"
                  placeholder="1"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-500"
                />
              </div>

              {/* Active */}
              <div className="flex items-center">

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Active Skill
                  </span>
                </label>

              </div>

              {/* Preview */}
              {form.icon_url && (
                <div className="md:col-span-2 rounded-lg bg-gray-50 p-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={form.icon_url}
                      alt={form.name || "Skill"}
                      className="h-12 w-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div>
                      <p className="font-medium">
                        {form.name || "Skill"}
                      </p>

                      <p className="text-sm text-gray-500">
                        Icon Preview
                      </p>
                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-2.5 font-medium text-white hover:bg-purple-700"
            >
              {editingId ? "Update Skill" : "Save Skill"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

// ======================================================
// SKILLS PAGE
// ======================================================

const Skills = () => {
  const [skills, setSkills] = useState([]);

  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // ======================================================
  // GET SKILLS
  // ======================================================

  const fetchSkills = async () => {
    try {
      setLoading(true);

      const data = await getSkillsApi();

      setSkills(data.skills || []);
    } catch (error) {
      console.log(error.message);

      toast.error(
        error.message || "Failed to fetch skills"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ======================================================
  // HANDLE CHANGE
  // ======================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ======================================================
  // ADD
  // ======================================================

  const handleAdd = () => {
    setEditingId(null);

    setForm(initialForm);

    setIsModalOpen(true);
  };

  // ======================================================
  // EDIT
  // ======================================================

  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setForm({
      name: skill.name || "",
      category: skill.category || "Frontend",
      proficiency:
        skill.proficiency || "Beginner",
      experience_years:
        skill.experience_years ?? "",
      icon_url: skill.icon_url || "",
      display_order:
        skill.display_order ?? "",
      is_active:
        skill.is_active ?? true,
    });

    setIsModalOpen(true);
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const handleClose = () => {
    setIsModalOpen(false);

    setEditingId(null);

    setForm(initialForm);
  };

  // ======================================================
  // CREATE / UPDATE
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,

        experience_years:
          Number(form.experience_years),

        display_order:
          Number(form.display_order),
      };

      console.log("SKILL PAYLOAD:", payload);

      if (editingId) {
        await updateSkillApi(
          editingId,
          payload
        );

        toast.success(
          "Skill updated successfully"
        );
      } else {
        await createSkillApi(payload);

        toast.success(
          "Skill added successfully"
        );
      }

      handleClose();

      await fetchSkills();

    } catch (error) {
      console.log(error.message);

      toast.error(
        error.message ||
          "Something went wrong"
      );
    }
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSkillApi(id);

      toast.success(
        "Skill deleted successfully"
      );

      await fetchSkills();

    } catch (error) {
      console.log(error.message);

      toast.error(
        error.message ||
          "Failed to delete skill"
      );
    }
  };

  // ======================================================
  // PROFICIENCY STYLE
  // ======================================================

  const getProficiencyStyle = (proficiency) => {
    switch (proficiency) {
      case "Expert":
        return "bg-purple-50 text-purple-600";

      case "Advanced":
        return "bg-blue-50 text-blue-600";

      case "Intermediate":
        return "bg-green-50 text-green-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10 flex items-start justify-between">

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-950">
              Skills
            </h1>

            <p className="mt-4 text-lg text-gray-500">
              Manage your technical skills
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-7 py-4 text-lg font-semibold text-white hover:bg-purple-700"
          >
            <Plus size={23} />

            Add Skill
          </button>

        </div>

        {/* Skills */}

        {loading ? (

          <div className="rounded-2xl border bg-white p-12 text-center">
            Loading skills...
          </div>

        ) : skills.length === 0 ? (

          <div className="rounded-2xl border bg-white p-16 text-center">

            <h2 className="text-xl font-semibold">
              No skills found
            </h2>

            <p className="mt-2 text-gray-500">
              Add your first technical skill.
            </p>

            <button
              onClick={handleAdd}
              className="mt-5 rounded-lg bg-purple-600 px-5 py-2.5 text-white"
            >
              Add Skill
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {skills.map((skill) => (

              <div
                key={skill.id}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  {/* Skill information */}

                  <div className="flex items-center gap-7">

                    {/* Icon */}

                    <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-gray-100">

                      {skill.icon_url ? (
                        <img
                          src={skill.icon_url}
                          alt={skill.name}
                          className="h-16 w-16 object-contain"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-gray-400">
                          {skill.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </span>
                      )}

                    </div>

                    {/* Details */}

                    <div>

                      <div className="flex items-center gap-3">

                        <h2 className="text-2xl font-bold text-gray-900">
                          {skill.name}
                        </h2>

                        <span className="rounded-full bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-600">
                          {skill.category}
                        </span>

                        <span
                          className={`rounded-full px-4 py-1.5 text-sm font-medium ${getProficiencyStyle(
                            skill.proficiency
                          )}`}
                        >
                          {skill.proficiency}
                        </span>

                      </div>

                      <p className="mt-3 text-gray-500">
                        {skill.experience_years}{" "}
                        {Number(
                          skill.experience_years
                        ) === 1
                          ? "year"
                          : "years"}{" "}
                        experience
                      </p>

                      <div className="mt-4 flex items-center gap-2">

                        <span
                          className={`h-2 w-2 rounded-full ${
                            skill.is_active
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />

                        <span className="text-sm text-gray-500">
                          {skill.is_active
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Buttons */}

                  <div className="flex items-center gap-3">

                    {skill.icon_url && (
                      <a
                        href={skill.icon_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-xl border text-gray-500 hover:bg-gray-50"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}

                    <button
                      onClick={() =>
                        handleEdit(skill)
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-xl border text-gray-500 hover:bg-gray-50 hover:text-purple-600"
                    >
                      <Pencil size={20} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(skill.id)
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-xl border text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Modal */}

      <SkillModal
        isOpen={isModalOpen}
        onClose={handleClose}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

    </div>
  );
};

export default Skills;