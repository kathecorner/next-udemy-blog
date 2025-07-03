//import { getPosts } from '@/lib/posts';
import PostCard from '@/components/post/PostCard';
import { Post } from '@/lib/types/post';
import { getPosts, searchPosts } from '@/lib/post';
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル


type SearchParams = {
  search?: string;
}

export default async function PostsPage(
  {searchParams}:{ searchParams: Promise<SearchParams>}) {
  const resolvedSearchParams = await searchParams;
    const query = await resolvedSearchParams.search || '';
  const posts = query
    ? await searchPosts(query) as Post[]
    : await getPosts() as Post[];

  return (
    
      <>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {posts.map((post)=>(
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </>
      
    
  )
}
