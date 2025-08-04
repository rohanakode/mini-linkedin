import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import PostList from "../components/PostList.jsx";

function Profile() {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    const res = await axios.get(
      `backendhttps://mini-linkedin-backend-p77t.onrender.com/${id}`
    );
    setProfile(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(
        `backendhttps://mini-linkedin-backend-p77t.onrender.com/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProfile();
    }
  };

  if (!profile) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>{profile.user.name}</Card.Title>
          <Card.Text>{profile.user.bio}</Card.Text>
          <small className="text-muted">{profile.user.email}</small>
        </Card.Body>
      </Card>

      <h4>User Posts</h4>
      {profile.posts.length === 0 ? (
        <div className="text-center text-muted mt-4">No posts yet</div>
      ) : (
        profile.posts.map((post) => (
          <Card key={post._id} className="mb-3 shadow-sm border-0 rounded">
            <Card.Body>
              <Card.Title>{post.author.name}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              <small className="text-muted">
                {new Date(post.createdAt).toLocaleString()}
              </small>
              {user && user._id === profile.user._id && (
                <div className="mt-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Profile;
