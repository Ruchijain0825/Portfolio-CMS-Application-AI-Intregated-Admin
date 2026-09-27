
import { LoginUser } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const [formData,setFormDate] = useState({email:"",password:""});
    const[isLoading,setIsLoading]=useState(false);
    const[error,setError]=useState("");

    const handleLogin =(e)=>
    {
        setFormDate({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        setError("");
        setIsLoading(true)
        try{
           const result = await LoginUser(formData)
           toast.success(result.message || "Login successful")
           
           navigate('/Dashboard')
        }
        catch(error)
        {
            toast.error(error.message || "Login failed")
        }
        finally{
            setIsLoading(false);
         }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.15),_transparent_40%)]" />

      <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">

        <div className="mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg mb-4">
            C
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your CMS dashboard</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email address
            </label>

            <input name ="email"
              type="email"
              placeholder="admin@example.com" onChange={handleLogin} value ={formData.email}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <button type="button" className="text-xs text-indigo-600 hover:text-indigo-700">
                Forgot password?
              </button>
            </div>

            <input
              type="password" name = "password"
              placeholder="••••••••" onChange={handleLogin} value ={formData.password}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          <button
            type="submit" disabled ={isLoading}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition shadow-md shadow-indigo-200"
          >
           {isLoading ? "Loggin in" : "sign in"}
          </button>

        </form>

        <p className="text-center text-xs text-slate-400 mt-5">
          © 2026 CMS Admin Panel
        </p>

      </div>
    </div>
  );
};

export default Login;