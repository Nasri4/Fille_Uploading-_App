import React, { useState, useEffect } from "react";
import Button from "./Button";

function SmallSocial() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [chosenFile, setChosenFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setChosenFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    } else {
      setChosenFile(null);
      setFileName("No file chosen");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !chosenFile) {
      setError("Please fill in all fields");
      return;
    }
    const newPost = {
      title: title,
      file: chosenFile,
      fileName: fileName,
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setTitle("");
    setChosenFile(null);
    setFileName("No file chosen");
    setError(null);
    setShowForm(false); // Close the form after submitting
  };

  const handleDeletePost = (index) => {
    setPosts((prevPosts) => prevPosts.filter((post, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#93C5FD] relative">
      {showForm && (
        <div className="w-[400px] bg-blue-300 p-6 rounded-lg shadow-lg">
          <div className="bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter title..."
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex items-center mb-4">
              <label
                htmlFor="fileUpload"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600"
              >
                Choose File
              </label>
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="ml-2 text-gray-500">{fileName}</span>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Floating "+" Button */}
      <Button onClick={toggleForm} />

      {/* Posts */}
      <div className="mt-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-lg font-bold mb-2">{post.title}</h2>
            <img
              src={URL.createObjectURL(post.file)}
              alt={post.fileName}
              className="w-full h-64 object-cover mb-4"
            />
            <button
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => handleDeletePost(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmallSocial;