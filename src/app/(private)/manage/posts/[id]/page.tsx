import { getOwnPost } from '@/lib/ownPost';
import { notFound } from 'next/navigation';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { PostCardProps } from '@/lib/types/post'
import { format } from 'date-fns';
import { enGB, ja, Locale } from 'date-fns/locale';
import Image from 'next/image'
import { auth } from '@/auth';
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル


type Params = {
  params: Promise<{id: string}>
};

export default async function ShowPage({params}: Params) {
    const session = await auth()
    const userId = session?.user?.id
    if(!session?.user?.email || !userId){
    throw new Error('invalid request');
    } 
    
    const {id} = await params;
    const post = await getOwnPost(userId, id);
    console.log('Post ID:', id);
    

    if (!post) {
        notFound();
    }

  return (
    <div className='container mx-auto p-4 py-8'>
        
      <Card className='max-w-3xl mx-auto shadow-lg'>
        {post.topImage && (
          <div className="relative w-full h-64 lg:h-96">
            <Image 
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="rounded-t-md object-cover w-full h-full"
              priority
            />
          </div>
        )}
        <CardHeader>
            <div className='flex justify-between items-baseline'><p>Author: { post.author.name }</p>
            </div>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}
                                  rehypePlugins={[rehypeHighlight]}
                                  skipHtml={false} // HTMLスキップを無効化
                                  unwrapDisallowed={true}// Markdownの改行を解釈
                              >{post.content}</ReactMarkdown>
                          </div>
        </CardContent>
        </Card>
      
    </div>
  )
}
