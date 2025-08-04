import React from "react";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted mt-3">No posts yet</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Card key={post._id} className="mb-3 shadow-sm border-0 rounded">
          <Card.Body>
            <Card.Title className="text-capitalize">
              {post.author.name}
            </Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <small className="text-muted">
              {dayjs(post.createdAt).fromNow()}
            </small>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default PostList;
