import React, { useState,useEffect } from "react";
import toast from "react-hot-toast";
import {
  Eye,
  ExternalLink,
  Upload,
  Camera,
  UserRound,
  MapPin,
  Mail,
  Link as LinkIcon,
  Save,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
} from "lucide-react";
import { updateaboutapi,createaboutapi,getaboutapi } from "../services/aboutapi";

const About = () => {
  
  const [formData, setFormData] = useState({
    name: "Ruchi",
    headline: "Full Stack Web Developer",
    shortBio:
      "I build modern web applications with clean code and great user experiences.",
    description:
      "I’m a Full Stack Web Developer with a passion for building scalable and user-friendly web applications. I enjoy working with modern technologies like React, Node.js, and PostgreSQL. I love solving real-world problems and continuously learning new technologies to improve my skills.",
    location: "Indore, India",
    email: "ruchi@example.com",
    linkedin: "https://linkedin.com/in/ruchi",
    github: "https://github.com/ruchi",
    website: "https://ruchi.dev",
  });
  const[isLoading,setIsLoading]=useState(false);
  const[isexisting,setIsExisting]=useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  useEffect(() => {
  const getAbout = async () => {
    try {
      setIsLoading(true);

      const result = await getaboutapi();

      console.log("GET ABOUT:", result);
      console.log("ABOUT ID:", result.about?.id);

      if (result.about) {
        const about = result.about;

        setFormData((prev) => ({
          ...prev,
          id: about.id || "",
          name: about.name || "",
          title: about.title || "",
          shortBio: about.short_bio || "",
          content: about.content || "",
          location: about.location || "",
          email: about.email || "",
          linked_url: about.linkedin_url || "",
          github_url: about.github_url || "",
          resumeurl: about.resumeurl || "",
          profileImage: about.profile_image || "",
        }));

        setImagePreview(about.profile_image || "");
        setIsExisting(true);
      } else {
        setIsExisting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  getAbout();
}, []);
   
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({...formData,[e.target.name]:e.target.value})


  };

const handleImageChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setImage(file);
  setImagePreview(URL.createObjectURL(file));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("headline", formData.title);
    data.append("shortBio", formData.shortBio);
    data.append("description", formData.content);
    data.append("location", formData.location);
    data.append("email", formData.email);
    data.append("linkedin", formData.linked_url);
    data.append("github", formData.github_url);
    data.append("website", formData.resumeurl);

    if (image) {
      data.append("image", image);
    }

    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }

    let result;

    if (isexisting) {
      result = await updateaboutapi(formData.id,data);
    } else {
      result = await createaboutapi(data);
       setFormData((prev) => ({
    ...prev,
    id: result.about.id,
  }));
      setIsExisting(true);
    }

    toast.success(result.message);
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};
  return (
    <div className="w-full min-h-screen bg-white">

      {/* ================= HEADER ================= */}
      <div className="px-7 pt-6 pb-4 border-b border-gray-100">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-[24px] font-semibold text-[#11162a]">
              Edit About Section
            </h1>

            <p className="text-[13px] text-[#6d748b] mt-1">
              Update your personal information, bio, and social links.
              These details will be shown on your portfolio.
            </p>
          </div>

          <button className="h-10 px-4 flex items-center gap-2 bg-[#5138ee] text-white rounded-lg text-[13px] font-medium hover:bg-[#4530d4] transition">
            <Eye size={16} />
            View on Portfolio
            <ExternalLink size={14} />
          </button>

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-7 py-5">

        <div className="grid grid-cols-[1.4fr_0.85fr] gap-5">

          {/* =====================================================
                            LEFT FORM
          ====================================================== */}

          <div className="border border-[#e3e6ee] rounded-xl bg-white">

            {/* CARD HEADER */}
            <div className="px-5 py-4 flex items-center justify-between">

              <h2 className="text-[16px] font-semibold text-[#151a2e]">
                Basic Information
              </h2>

              <label className="h-9 px-3 flex items-center gap-2 bg-[#efedff] text-[#5138ee] rounded-lg text-[12px] font-medium cursor-pointer">
                <Upload size={15} />
                Change Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

            </div>

            <form onSubmit={handleSubmit} className="px-5 pb-5">

              {/* PROFILE + BASIC DETAILS */}
              <div className="grid grid-cols-[125px_1fr] gap-5">

                {/* PROFILE */}
                <div className="relative">

                  <div className="w-[125px] h-[125px] rounded-full overflow-hidden bg-[#eeeaff] flex items-center justify-center">

                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserRound
                        size={48}
                        strokeWidth={1.3}
                        className="text-[#8178c0]"
                      />
                    )}

                  </div>

                  <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center cursor-pointer">

                    <Camera
                      size={15}
                      className="text-[#22263a]"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                  </label>

                </div>

                {/* NAME / HEADLINE / BIO */}
                <div className="space-y-3">

                  <div className="grid grid-cols-2 gap-3">

                    <div>
                      <label className="block text-[12px] font-medium text-[#171b30] mb-1.5">
                        Name
                      </label>

                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-9 px-3 border border-[#dfe3ec] rounded-md text-[12px] outline-none focus:border-[#5138ee]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium text-[#171b30] mb-1.5">
                        Headline
                      </label>

                      <input
                        name="headline"
                        value={formData.headline}
                        onChange={handleChange}
                        className="w-full h-9 px-3 border border-[#dfe3ec] rounded-md text-[12px] outline-none focus:border-[#5138ee]"
                      />
                    </div>

                  </div>

                  <div>

                    <label className="block text-[12px] font-medium text-[#171b30] mb-1.5">
                      Short Bio
                      <span className="font-normal text-gray-500">
                        {" "}
                        (shown in hero section)
                      </span>
                    </label>

                    <div className="relative">

                      <textarea
                        name="shortBio"
                        value={formData.shortBio}
                        onChange={handleChange}
                        maxLength={200}
                        rows={3}
                        className="w-full px-3 py-2.5 pb-6 border border-[#dfe3ec] rounded-md text-[12px] resize-none outline-none focus:border-[#5138ee]"
                      />

                      <span className="absolute right-2 bottom-1.5 text-[10px] text-gray-400">
                        {formData.shortBio.length}/200
                      </span>

                    </div>

                  </div>

                </div>
              </div>

              {/* ================= DESCRIPTION ================= */}
              <div className="mt-4">

                <label className="block text-[12px] font-medium text-[#171b30] mb-1.5">
                  About Description
                </label>

                <div className="border border-[#dfe3ec] rounded-md overflow-hidden">

                  <div className="h-9 px-3 flex items-center gap-4 border-b border-[#e5e7ed]">

                    <select className="text-[11px] outline-none bg-transparent">
                      <option>Normal</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                    </select>

                    <Bold size={15} />
                    <Italic size={15} />
                    <Underline size={15} />
                    <List size={16} />
                    <ListOrdered size={16} />
                    <LinkIcon size={16} />

                  </div>

                  <div className="relative">

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      maxLength={1000}
                      rows={5}
                      className="w-full px-3 py-2.5 pb-6 text-[12px] leading-5 resize-none outline-none"
                    />

                  <span className="absolute right-2 bottom-1.5 text-[10px] text-gray-400">
                 {(formData.shortBio || "").length}/200
                   </span>

                  </div>

                </div>

              </div>

              {/* ================= LOCATION + EMAIL ================= */}
              <div className="grid grid-cols-2 gap-3 mt-4">

                <div>

                  <label className="block text-[12px] font-medium text-[#171b30] mb-1.5">
                    Location
                  </label>

                  <div className="relative">

                    <MapPin
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full h-9 pl-9 pr-3 border border-[#dfe3ec] rounded-md text-[12px] outline-none focus:border-[#5138ee]"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-[12px] font-medium text-[#171b30] mb-1.5">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-9 pl-9 pr-3 border border-[#dfe3ec] rounded-md text-[12px] outline-none focus:border-[#5138ee]"
                    />

                  </div>

                </div>

              </div>

              {/* ================= SOCIAL LINKS ================= */}
              <div className="mt-4">

                <label className="block text-[12px] font-medium text-[#171b30] mb-1.5">
                  Social Links
                </label>

                <div className="grid grid-cols-3 gap-3">

                  <div className="relative">
                    <LinkIcon
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full h-9 pl-9 pr-2 border border-[#dfe3ec] rounded-md text-[11px] outline-none focus:border-[#5138ee]"
                    />
                  </div>

                  <div className="relative">
                    <LinkIcon
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="w-full h-9 pl-9 pr-2 border border-[#dfe3ec] rounded-md text-[11px] outline-none focus:border-[#5138ee]"
                    />
                  </div>

                  <div className="relative">
                    <LinkIcon
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full h-9 pl-9 pr-2 border border-[#dfe3ec] rounded-md text-[11px] outline-none focus:border-[#5138ee]"
                    />
                  </div>

                </div>
              </div>

              {/* SAVE */}
              <div className="flex justify-end mt-5">

                <button
                  type="submit" 
                  className="h-10 px-5 flex items-center gap-2 bg-[#5138ee] hover:bg-[#4530d4] text-white rounded-lg text-[12px] font-medium transition"
                >
                  <Save size={15} />
                  Save Changes
                </button>

              </div>

            </form>
          </div>

          {/* =====================================================
                            RIGHT PREVIEW
          ====================================================== */}

          <div className="border border-[#e3e6ee] rounded-xl bg-white overflow-hidden">

            {/* HEADER */}
            <div className="px-5 py-4 border-b border-[#e8eaf0]">

              <h2 className="text-[16px] font-semibold text-[#151a2e]">
                Live Preview (About Section)
              </h2>

              <p className="text-[12px] text-[#737a90] mt-1">
                This is how it will look on your portfolio.
              </p>

            </div>

            {/* PREVIEW */}
            <div className="p-5 bg-[#fafbff] min-h-[610px]">

              <span className="inline-flex px-3 py-1.5 rounded-full bg-[#eeeaff] text-[#5138ee] text-[11px] font-medium">
                About Me
              </span>

              {/* HERO */}
              <div className="mt-5 flex items-center justify-between gap-4">

                <div className="flex-1">

                  <h2 className="text-[27px] leading-tight font-semibold text-[#101426]">
                    Hi, I’m{" "}
                    <span className="text-[#5138ee]">
                      {formData.name}
                    </span>
                  </h2>

                  <p className="mt-1.5 text-[14px] font-medium text-[#343b54]">
                    {formData.headline}
                  </p>

                  <p className="mt-3 text-[12px] leading-5 text-[#596078]">
                    {formData.shortBio}
                  </p>

                </div>

                <div className="w-[135px] h-[135px] rounded-full bg-[#e9e5ff] flex items-center justify-center overflow-hidden shrink-0">

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserRound
                      size={50}
                      strokeWidth={1.2}
                      className="text-[#8379c5]"
                    />
                  )}

                </div>

              </div>

              {/* DESCRIPTION */}
              <p className="mt-6 text-[12px] leading-6 text-[#505872]">
                {formData.description}
              </p>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-3 mt-6">

                <div className="flex items-center gap-2">

                  <MapPin
                    size={17}
                    className="text-[#5138ee]"
                  />

                  <span className="text-[11px] text-[#555d74]">
                    {formData.location}
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <Mail
                    size={17}
                    className="text-[#5138ee]"
                  />

                  <span className="text-[11px] text-[#555d74]">
                    {formData.email}
                  </span>

                </div>

              </div>

              {/* SOCIAL */}
              <div className="flex gap-2 mt-5">

                <a
                  href={formData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-[#dfe3ec] rounded-lg bg-white flex items-center justify-center hover:border-[#5138ee]"
                >
                  <LinkIcon size={16} />
                </a>

                <a
                  href={formData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-[#dfe3ec] rounded-lg bg-white flex items-center justify-center hover:border-[#5138ee]"
                >
                  <LinkIcon size={16} />
                </a>

                <a
                  href={formData.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-[#dfe3ec] rounded-lg bg-white flex items-center justify-center hover:border-[#5138ee]"
                >
                  <ExternalLink size={16} />
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;