import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { Form, Button } from "react-bootstrap";

function PostForm({ onPostCreated }) {
  const [content, setContent] = useState("");
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/posts`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setContent("");
    onPostCreated();
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
      </Form.Group>
      <Button type="submit" className="mt-2" variant="primary">
        Post
      </Button>
    </Form>
  );
}

export default PostForm;
