import {getOwnPosts } from "@/lib/ownPost"
import { auth } from "@/auth"
import PostDropdownMenu from "@/components/post/PostDropdownMenu"
import { Button } from '@/components/ui/button'
import Link  from 'next/link'

export default async function DashBoardPage() {
  const session = await auth()
  const userId = session?.user?.id
  if(!session?.user?.email || !userId){
    throw new Error('invalid request');
  } 

  const posts = await getOwnPosts(userId)
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">
          <Button>

            <Link href="/manage/posts/create" >Create New Article</Link>
          </Button>
        </h1>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">Title</th>
            <th className="border p-2 text-center">View</th>
            <th className="border p-2 text-center">Updated at</th>
            <th className="border p-2 text-center">Control</th>
          </tr>
        </thead>
        <tbody>
          { posts.map((post)=>(
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.published ? "View" : "Hide"}</td>
              <td className="border p-2">{new Date(post.updatedAt).toLocaleString()}</td>
              <td className="border p-2">
                <PostDropdownMenu postId={post.id}></PostDropdownMenu>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
      
    </div>
  )
}
