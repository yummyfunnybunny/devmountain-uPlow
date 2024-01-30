import { useEffect, useState } from 'react';
import axios from 'axios';

function BlogPost() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get('/blogPosts')
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  }, []);

  return (
    <article>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
    </article>
  );
}

export default BlogPost;
