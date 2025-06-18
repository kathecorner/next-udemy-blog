import { getPost } from '@/lib/post';
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


type Params = {
  params: Promise<{id: string}>
};

export default async function PostPage({params}: Params) {
    const {id} = await params;
    const post = await getPost(id);
    console.log('Post ID:', id);
    console.log('Post ID:', post.title);

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
          <p className="text-gray-700 mb-4">{post.content}</p>
          <div className="text-sm text-gray-500"><time className="text-sm text-gray-500">
              { format(new Date(post.createdAt), 'yyyy年MM月dd日', { locale: ja })}
            </time><br />
            <span>By {post.author.name}</span>
            <span className="ml-4">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
        </Card>
      
    </div>
  )
}
