// src/app/posts/[postId]/page.tsx

// 1. ดึงข้อมูลโพสต์
async function getPost(postId: string) {
  // ใช้ fetch() เพื่อเรียก API สำหรับโพสต์แต่ละอัน
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await res.json();
  return post;
}

// 2. ดึงข้อมูลคอมเมนต์
async function getComments(postId: string) {
  // ใช้ fetch() เพื่อเรียก API สำหรับคอมเมนต์ของโพสต์แต่ละอัน
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const comments = await res.json();
  return comments;
}

// 3. สร้าง Component ของหน้า
export default async function PostAndCommentsPage({ params }: { params: { postId: string } }) {
  // ดึงค่า postId จาก URL ที่ส่งมาใน params
  const { postId } = params;

  // เรียกใช้ฟังก์ชันดึงข้อมูล 2 ตัวพร้อมกัน
  const post = await getPost(postId);
  const comments = await getComments(postId);

  return (
    <div>
      {/* ส่วนสำหรับแสดงรายละเอียดของโพสต์ */}
      <h1>Post ID: {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <hr />

      {/* ส่วนสำหรับแสดงคอมเมนต์ */}
      <h3>Comments</h3>
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}