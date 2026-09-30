import { useState } from "react";

const Blog = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    category: "",
    tags: [""],
    published_at: "",
    is_published: false,
    reading_time: 5,
    display_order: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setFormData((prev) => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
    }));
  };

  const handleTagChange = (index, value) => {
    setFormData((prev) => {
      const tags = [...prev.tags];
      tags[index] = value;

      return {
        ...prev,
        tags,
      };
    });
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.filter((tag) => tag.trim() !== ""),
      reading_time: Number(formData.reading_time),
      display_order: Number(formData.display_order),
      published_at: formData.is_published
        ? formData.published_at || new Date().toISOString()
        : null,
    };

    console.log(payload);

    // axios.post("/api/blogs", payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Blog Post
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Write and publish an article for your portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Information */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="space-y-5">

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Understanding React Hooks"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-purple-500"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="understanding-react-hooks"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-purple-500"
                  required
                />

                <p className="mt-1 text-xs text-gray-500">
                  Used in the blog URL.
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="React">React</option>
                  <option value="Node.js">Node.js</option>
                  <option value="System Design">
                    System Design
                  </option>
                  <option value="AI">AI</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Career">Career</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Excerpt */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Excerpt
                </label>

                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  maxLength={300}
                  placeholder="Short summary of your article..."
                  className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-purple-500"
                />

                <p className="mt-1 text-right text-xs text-gray-400">
                  {formData.excerpt.length}/300
                </p>
              </div>

            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold">
              Cover Image
            </h2>

            <input
              type="url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleChange}
              placeholder="https://example.com/blog-cover.jpg"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-purple-500"
            />

            {formData.cover_image_url && (
              <div className="mt-4 overflow-hidden rounded-xl border">
                <img
                  src={formData.cover_image_url}
                  alt="Blog cover preview"
                  className="h-56 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold">
              Article Content
            </h2>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={16}
              placeholder="Write your article here..."
              className="w-full resize-y rounded-lg border px-4 py-3 font-mono text-sm outline-none focus:border-purple-500"
              required
            />

            <p className="mt-2 text-xs text-gray-500">
              You can later replace this textarea with a Markdown or
              rich-text editor.
            </p>

          </div>

          {/* Tags */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Tags
              </h2>

              <button
                type="button"
                onClick={addTag}
                className="rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200"
              >
                + Add Tag
              </button>
            </div>

            <div className="space-y-3">

              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) =>
                      handleTagChange(index, e.target.value)
                    }
                    placeholder="e.g. React"
                    className="flex-1 rounded-lg border px-4 py-2.5 outline-none focus:border-purple-500"
                  />

                  {formData.tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="px-3 text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* Publishing */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold">
              Publishing
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Reading Time */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Reading Time (minutes)
                </label>

                <input
                  type="number"
                  name="reading_time"
                  value={formData.reading_time}
                  onChange={handleChange}
                  min="1"
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-purple-500"
                />
              </div>

              {/* Published At */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Publish Date
                </label>

                <input
                  type="datetime-local"
                  name="published_at"
                  value={formData.published_at}
                  onChange={handleChange}
                  disabled={!formData.is_published}
                  className="w-full rounded-lg border px-4 py-2.5 disabled:bg-gray-100"
                />
              </div>

            </div>

            {/* Publish Toggle */}
            <label className="mt-5 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <div>
                <p className="text-sm font-medium">
                  Publish this article
                </p>

                <p className="text-xs text-gray-500">
                  Turn this off to save it as a draft.
                </p>
              </div>
            </label>

          </div>

          {/* Display Settings */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold">
              Display Settings
            </h2>

            <div className="max-w-sm">

              <label className="mb-2 block text-sm font-medium">
                Display Order
              </label>

              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                min="1"
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-purple-500"
              />

            </div>
          </div>

          {/* Actions */}
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
              {formData.is_published
                ? "Publish Article"
                : "Save Draft"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Blog;