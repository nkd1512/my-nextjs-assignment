// src/app/posts/[postId]/page.tsx

// กำหนดชนิดข้อมูล (Interface) สำหรับข้อมูล
interface Post {
    id: number;
    title: string;
    body: string;
}

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

// ฟังก์ชันดึงข้อมูลโพสต์
async function getPost(postId: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await res.json();
  return post;
}

// ฟังก์ชันดึงข้อมูลคอมเมนต์
async function getComments(postId: string): Promise<Comment[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const comments = await res.json();
  return comments;
}

// คอมโพเนนต์หลักที่รับ props จาก Next.js
export default async function PostAndCommentsPage({ params }: { params: { postId: string } }) {
  const { postId } = params;

  // ใช้ Promise.all เพื่อดึงข้อมูลพร้อมกัน
  const [post, comments] = await Promise.all([
    getPost(postId),
    getComments(postId)
  ]);

  return (
    <div>
      <h1>Post ID: {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <hr />

      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}