import { useEffect, useState } from "react";
import AddPost from "../components/Posts/AddPost";
import PostCard from "../components/Posts/PostCard";
import { useNavigate } from "react-router-dom";
const POSTS_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";
const DEFAULT_POST_LIMIT = 20;


 function PostsPage({ user, setUser }) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");
    const navigate = useNavigate(); 
   useEffect(() => {
  const controller = new AbortController();

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setFetchError("");

      const response = await fetch(POSTS_ENDPOINT, {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error("Failed to load posts");
      }

      const data = await response.json();

      const localPosts =
        JSON.parse(localStorage.getItem("userPosts")) || [];

      const allPosts = [
        ...localPosts,
        ...data.slice(0, DEFAULT_POST_LIMIT)
      ];

      setPosts(allPosts);

    } catch (error) {
      if (error.name !== "AbortError") {
        setFetchError("We couldn't load posts right now. Please refresh.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  loadPosts();

  return () => {
    controller.abort();
  };
}, []);

useEffect(() => {
  const storedComments =
    JSON.parse(localStorage.getItem("comments")) || {};

  setComments(storedComments);
}, []);
    const logout = () => {
        setUser(null); navigate("/");
    };
    return (
        <div className="page posts-page">
            <div className="posts-container">
                <header className="topbar">
                    <div>
                        <p className="brand-chip">Social Hub</p>
                        <h1 className="page-title">Welcome back, {user.name || "friend"}.</h1>
                        <p className="page-subtitle">Share updates, edit your posts, and keep the conversation moving.</p>
                    </div>
                    <button className="ghost-button danger" onClick={logout}> Logout </button>
                </header>
                <AddPost setPosts={setPosts} user={user} />
                {isLoading && (
                    <section className="status-card">
                        <p>Loading posts...</p> </section>
                )} {!isLoading && fetchError && (
                    <section className="status-card error">
                        <p>{fetchError}</p>
                    </section>)} {!isLoading && !fetchError && posts.length === 0 && (
                        <section className="status-card">
                            <p>No posts yet. Create the first one above.</p>
                        </section>)}
                <div className="post-list">
                    {posts.map((post) => (
                        <PostCard key={post.id}
                            post={post}
                            user={user}
                            setPosts={setPosts}
                            comments={comments}
                            setComments={setComments} />))}
                </div>
            </div>
        </div>
    );
}
export default PostsPage;