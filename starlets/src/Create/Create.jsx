import { useContext, useState } from "react";
import axios from 'axios';
import './Create.css';
import Category from './Category';
import { useNavigate } from 'react-router-dom';
/* import Navbar from '../../components/navbar/Navbar'; */
import Chatbot from '../components/Chatbot';
//import { Context } from "../../context/Context"; // If you use context for user authentication

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
 //const { user } = useContext(Context); // Uncomment this if using context for user
  const user = { username: 'purity' }; // Temporarily hardcoded

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
      category: [selectedCategory],
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
      } catch (err) {
        console.error("Error uploading file:", err);
        return;
      }
    }
    try {
      const res = await axios.post("http://localhost:4000/api/posts", newPost);
      navigate(`/post/${res.data._id}`); // Navigate to the post detail page with the post ID
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="create">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="createForm">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="createForm">
            <textarea
              className="writeText"
              type="text"
              placeholder="Create Post"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <Category onSelect={(category) => setSelectedCategory(category)} />
          </div>
          <button
            className="submitButton"
            type="submit"
          >
            POST
          </button>
          <Chatbot />
        </form>
      </div>
    </>
  );
}
