import { useTheme } from "../Context/ThemeContext";
import { useEffect, useState } from "react";
import api from "./../utils/api";
import { useAuth } from "../Context/AuthContext";

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchApi = async () => {
    try {
      const res = await api.get("/blog/");
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/blog/${editId}`, { title, description });
        setEditId(null);
      } else {
        await api.post("/blog/", { title, description });
      }
      setDescription("");
      setTitle("");
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (u) => {
    setEditId(u._id);
    setTitle(u.title);
    setDescription(u.description);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blog/${id}`);
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      logout();
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  // Dynamic Theme Classes
  const themeClasses =
    theme === "light" ? "bg-white text-slate-800" : "bg-slate-900 text-white";

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${themeClasses}`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
        <h1 className="text-2xl font-bold italic tracking-tight">
          My Blog Dashboard
        </h1>
        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg border border-slate-500 hover:bg-slate-500 hover:text-white transition"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-1">
          <div
            className={`p-6 rounded-xl shadow-lg border ${theme === "light" ? "bg-slate-50" : "bg-slate-800 border-slate-700"}`}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editId ? "Edit Post" : "Create New Post"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Post Title"
                className="p-2 rounded border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="p-2 rounded border border-slate-300 text-slate-900 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                {editId ? "Update Post" : "Submit Post"}
              </button>
              {editId && (
                <button
                  onClick={() => {
                    setEditId(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="text-sm underline opacity-70"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="md:col-span-2 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={theme === "light" ? "bg-slate-200" : "bg-slate-800"}
              >
                <th className="p-4 border-b border-slate-600">Title</th>
                <th className="p-4 border-b border-slate-600">Description</th>
                <th className="p-4 border-b border-slate-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {post.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-slate-700 hover:bg-slate-500/10 transition"
                >
                  <td className="p-4 font-medium">{u.title}</td>
                  <td className="p-4 text-sm opacity-80">{u.description}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(u)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {post.length === 0 && (
            <p className="text-center py-10 opacity-50 italic">
              No posts found. Start writing!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
