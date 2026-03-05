import React, { useEffect, useState } from "react";
import { api } from "./utils/api";

const App = () => {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchApi = async () => {
    try {
      const res = await api.get("/");
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
        await api.put(`/${editId}`, { title, description });
        setEditId(null);
      } else {
        const res = await api.post("/", {
          title,
          description,
        });
        console.log(res.data);
        console.log("success");
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
      await api.delete(`/${id}`);
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button>create</button>
      <table border={"1"}>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        {post.map((u) => (
          <tr key={u._id}>
            <td>{u.title}</td>
            <td>{u.description}</td>
            <td>
              <button onClick={() => handleEdit(u)}>Edit</button>
              <button onClick={() => handleDelete(u._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
      <p></p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p></p>
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p></p>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default App;
