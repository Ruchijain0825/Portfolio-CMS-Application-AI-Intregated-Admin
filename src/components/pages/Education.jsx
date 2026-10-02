import { useEffect, useState } from "react";

import { createEducation,getEducations,getEducationById,updateEducation,deleteEducation } from "../services/educationapi.js";
  


const emptyForm = {
  degree: "",
  institution: "",
  field_of_study: "",
  start_year: "",
  end_year: "",
  description: "",
};


const Education = () => {

  const [educations, setEducations] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);


  // ==========================================
  // GET EDUCATIONS
  // ==========================================

  const loadEducations = async () => {
    try {

      setLoading(true);

      const result = await getEducations();

      console.log("EDUCATION RESPONSE:", result);

      setEducations(result.data || []);

    } catch (error) {

      console.error(
        "GET EDUCATION ERROR:",
        error.message
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadEducations();

  }, []);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const handleAdd = () => {

    setEditingId(null);

    setFormData(emptyForm);

    setShowModal(true);

  };


  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  const handleEdit = (education) => {

    setEditingId(education.id);

    setFormData({

      degree: education.degree || "",

      institution: education.institution || "",

      field_of_study:
        education.field_of_study || "",

      start_year:
        education.start_year || "",

      end_year:
        education.end_year || "",

      description:
        education.description || "",

    });

    setShowModal(true);

  };


  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {

    if (saving) return;

    setShowModal(false);

    setEditingId(null);

    setFormData(emptyForm);

  };


  // ==========================================
  // CREATE / UPDATE
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);


      const data = {

        degree: formData.degree.trim(),

        institution:
          formData.institution.trim(),

        field_of_study:
          formData.field_of_study.trim(),

        start_year:
          Number(formData.start_year),

        end_year:
          Number(formData.end_year),

        description:
          formData.description.trim(),

      };


      console.log(
        "EDUCATION DATA:",
        data
      );


      // UPDATE

      if (editingId) {

        await updateEducation(
          editingId,
          data
        );

      }

      // CREATE

      else {

        await createEducation(data);

      }


      closeModal();

      await loadEducations();

    } catch (error) {

      console.error(
        "SAVE EDUCATION ERROR:",
        error
      );

      alert(
        error.message ||
        "Failed to save education"
      );

    } finally {

      setSaving(false);

    }

  };


  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this education?"
    );

    if (!confirmDelete) return;


    try {

      await deleteEducation(id);

      await loadEducations();

    } catch (error) {

      console.error(
        "DELETE EDUCATION ERROR:",
        error
      );

      alert(
        error.message ||
        "Failed to delete education"
      );

    }

  };


  return (

    <div className="min-h-screen bg-[#fafbff] px-8 py-10">


      {/* ===================================== */}
      {/* PAGE HEADER */}
      {/* ===================================== */}

      <div className="
        mb-10
        flex
        items-start
        justify-between
      ">

        <div>

          <h1 className="
            text-5xl
            font-bold
            tracking-tight
            text-gray-950
          ">
            Education
          </h1>

          <p className="
            mt-4
            text-lg
            text-gray-500
          ">
            Manage your educational background
          </p>

        </div>


        <button
          onClick={handleAdd}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#4f2ee8]
            px-7
            py-4
            text-lg
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#4324d0]
          "
        >

          <span className="text-2xl">
            +
          </span>

          Add Education

        </button>

      </div>



      {/* ===================================== */}
      {/* LOADING */}
      {/* ===================================== */}

      {loading && (

        <div className="
          py-20
          text-center
        ">

          <p className="
            text-lg
            text-gray-500
          ">
            Loading education...
          </p>

        </div>

      )}



      {/* ===================================== */}
      {/* EMPTY STATE */}
      {/* ===================================== */}

      {!loading && educations.length === 0 && (

        <div className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-6
          py-20
          text-center
        ">

          <div className="text-5xl">
            🎓
          </div>

          <h2 className="
            mt-5
            text-2xl
            font-semibold
            text-gray-900
          ">
            No education added
          </h2>

          <p className="
            mt-2
            text-gray-500
          ">
            Add your educational background
            to your portfolio.
          </p>

          <button
            onClick={handleAdd}
            className="
              mt-6
              rounded-xl
              bg-purple-600
              px-6
              py-3
              font-semibold
              text-white
              hover:bg-purple-700
            "
          >
            Add Education
          </button>

        </div>

      )}



      {/* ===================================== */}
      {/* EDUCATION CARDS */}
      {/* ===================================== */}

      {!loading && educations.length > 0 && (

        <div className="
          space-y-5
        ">

          {educations.map((education) => (

            <div
              key={education.id}
              className="
                flex
                items-center
                gap-7
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-7
                py-6
                shadow-sm
                transition
                hover:shadow-md
              "
            >


              {/* ICON */}

              <div className="
                flex
                h-24
                w-24
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-purple-50
                text-4xl
              ">
                🎓
              </div>



              {/* CONTENT */}

              <div className="
                min-w-0
                flex-1
              ">

                <h2 className="
                  text-2xl
                  font-semibold
                  text-gray-950
                ">
                  {education.degree}
                </h2>


                <p className="
                  mt-2
                  text-lg
                  font-medium
                  text-gray-700
                ">
                  {education.institution}
                </p>


                <p className="
                  mt-1
                  text-gray-500
                ">
                  {education.field_of_study}
                </p>


                <div className="
                  mt-3
                  text-sm
                  text-gray-500
                ">

                  {education.start_year}
                  {" - "}
                  {education.end_year}

                </div>


                {education.description && (

                  <p className="
                    mt-3
                    max-w-3xl
                    text-gray-500
                  ">

                    {education.description}

                  </p>

                )}

              </div>



              {/* ACTIONS */}

              <div className="
                flex
                shrink-0
                gap-3
              ">

                <button
                  onClick={() =>
                    handleEdit(education)
                  }
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-gray-500
                    transition
                    hover:bg-purple-50
                    hover:text-purple-600
                  "
                  title="Edit"
                >
                  ✎
                </button>


                <button
                  onClick={() =>
                    handleDelete(education.id)
                  }
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-gray-500
                    transition
                    hover:bg-red-50
                    hover:text-red-500
                  "
                  title="Delete"
                >
                  🗑
                </button>

              </div>

            </div>

          ))}

        </div>

      )}



      {/* ===================================== */}
      {/* MODAL */}
      {/* ===================================== */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-5
            backdrop-blur-sm
          "
          onClick={closeModal}
        >


          <div
            className="
              max-h-[92vh]
              w-full
              max-w-4xl
              overflow-y-auto
              rounded-2xl
              bg-[#fafbff]
              p-6
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* ================================= */}
            {/* MODAL HEADER */}
            {/* ================================= */}

            <div className="
              mb-5
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-7
              py-5
            ">

              <div>

                <h2 className="
                  text-2xl
                  font-semibold
                  text-gray-950
                ">
                  {editingId
                    ? "Edit Education"
                    : "Add Education"}
                </h2>

                <p className="
                  mt-1
                  text-gray-500
                ">
                  {editingId
                    ? "Update your educational information"
                    : "Add your educational information"}
                </p>

              </div>


              <button
                type="button"
                onClick={closeModal}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-2xl
                  text-gray-400
                  hover:bg-gray-100
                  hover:text-gray-700
                "
              >
                ×
              </button>

            </div>



            {/* ================================= */}
            {/* FORM */}
            {/* ================================= */}

            <form onSubmit={handleSubmit}>


              {/* ================================= */}
              {/* EDUCATION INFORMATION */}
              {/* ================================= */}

              <div className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-8
                py-7
                shadow-sm
              ">

                <h3 className="
                  mb-7
                  text-xl
                  font-semibold
                  text-gray-900
                ">
                  Education Information
                </h3>



                {/* DEGREE + INSTITUTION */}

                <div className="
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-2
                ">


                  {/* DEGREE */}

                  <div>

                    <label className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-700
                    ">
                      Degree
                    </label>

                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      placeholder="e.g. B.Tech"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-5
                        py-4
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-purple-500
                        focus:ring-2
                        focus:ring-purple-100
                      "
                    />

                  </div>



                  {/* INSTITUTION */}

                  <div>

                    <label className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-700
                    ">
                      Institution
                    </label>

                    <input
                      type="text"
                      name="institution"
                      value={
                        formData.institution
                      }
                      onChange={handleChange}
                      placeholder="e.g. ABC University"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-5
                        py-4
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-purple-500
                        focus:ring-2
                        focus:ring-purple-100
                      "
                    />

                  </div>

                </div>



                {/* FIELD OF STUDY */}

                <div className="mt-5">

                  <label className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  ">
                    Field of Study
                  </label>

                  <input
                    type="text"
                    name="field_of_study"
                    value={
                      formData.field_of_study
                    }
                    onChange={handleChange}
                    placeholder="e.g. Computer Science & Engineering"
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      px-5
                      py-4
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-purple-500
                      focus:ring-2
                      focus:ring-purple-100
                    "
                  />

                </div>



                {/* START + END YEAR */}

                <div className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-2
                ">


                  {/* START YEAR */}

                  <div>

                    <label className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-700
                    ">
                      Start Year
                    </label>

                    <input
                      type="number"
                      name="start_year"
                      value={
                        formData.start_year
                      }
                      onChange={handleChange}
                      placeholder="e.g. 2020"
                      min="1900"
                      max="2100"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-5
                        py-4
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-purple-500
                        focus:ring-2
                        focus:ring-purple-100
                      "
                    />

                  </div>



                  {/* END YEAR */}

                  <div>

                    <label className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-700
                    ">
                      End Year
                    </label>

                    <input
                      type="number"
                      name="end_year"
                      value={
                        formData.end_year
                      }
                      onChange={handleChange}
                      placeholder="e.g. 2024"
                      min="1900"
                      max="2100"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-5
                        py-4
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-purple-500
                        focus:ring-2
                        focus:ring-purple-100
                      "
                    />

                  </div>

                </div>

              </div>



              {/* ================================= */}
              {/* DESCRIPTION */}
              {/* ================================= */}

              <div className="
                mt-5
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-8
                py-7
                shadow-sm
              ">

                <h3 className="
                  text-xl
                  font-semibold
                  text-gray-900
                ">
                  Description
                </h3>

                <p className="
                  mt-1
                  text-sm
                  text-gray-500
                ">
                  About Education
                </p>


                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  rows={6}
                  placeholder="Add relevant coursework, achievements, projects, etc."
                  className="
                    mt-4
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-gray-300
                    px-5
                    py-4
                    text-gray-700
                    outline-none
                    placeholder:text-gray-400
                    focus:border-purple-500
                    focus:ring-2
                    focus:ring-purple-100
                  "
                />


                <p className="
                  mt-2
                  text-sm
                  text-gray-400
                ">
                  Keep it concise and relevant
                  to your career.
                </p>

              </div>



              {/* ================================= */}
              {/* BUTTONS */}
              {/* ================================= */}

              <div className="
                mt-5
                flex
                justify-end
                gap-3
              ">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-7
                    py-3
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-50
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="
                    rounded-xl
                    bg-[#a000ff]
                    px-8
                    py-3
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#8d00e6]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Education"
                    : "Save Education"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
};


export default Education;