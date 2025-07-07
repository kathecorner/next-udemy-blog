import { auth } from '@/auth';
import { getOwnPost } from '@/lib/ownPost';
import { notFound } from 'next/navigation';
import EditPostForm  from '@/app/(private)/manage/posts/[id]/edit/EditPostForm';
import { Edit } from 'lucide-react';

type Params = {
  params: Promise<{id: string}>
};


export default async function EditPage({params}: Params) {
    const session = await auth()
    const userId = session?.user?.id
    if(!session?.user?.email || !userId){
    throw new Error('invalid request');
    } 
    
    const {id} = await params;
    const post = await getOwnPost(userId, id);
    //console.log('Post ID:', userId);
    

    if (!post) {
        notFound();
    }

  return (
    <div className='container mx-auto p-4 py-8'>
      <EditPostForm post={post} />
    </div>
  )
}