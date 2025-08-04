import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import PostForm from "../components/PostForm.jsx";
import PostList from "../components/PostList.jsx";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    const res = await axios.get(
      "https://mini-linkedin-backend-p77t.onrender.com"
    );
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="mb-4 text-center">Home Feed</h2>
            {user && (
              <div className="p-3 bg-white rounded shadow-sm mb-4">
                <PostForm onPostCreated={fetchPosts} />
              </div>
            )}
            <PostList posts={posts} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
