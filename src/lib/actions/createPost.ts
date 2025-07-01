'use server'
import { postSchema } from "@/validations/post"
import { saveImage } from '@/utils/image'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}


export async function createPost(
    prevState: ActionState, 
    formData: FormData
): Promise<ActionState> {
    //Obtain info of the form
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const topImageInput = formData.get('topImage')
    const topImage = topImageInput instanceof File ? topImageInput : null

    //validation
    const validationResult = postSchema.safeParse({ title, content, topImage})
    if(!validationResult.success){
        return { success: false, errors: validationResult.error.flatten().fieldErrors}
    }

    //save an image
    const imageUrl = topImage ? await saveImage(topImage) : null
    if(topImage && !imageUrl){
        return { success: false, errors: { image: ['failed to save the image']}}
    }

    //store in the DB
    const session = await auth()
    const userId = session?.user?.id
    if(!session?.user?.email || !userId){
        throw new Error('invalid request');
    }
    await prisma.post.create({
        data: {
            title,
            content,
            topImage : imageUrl,
            published: true,
            authorId: userId

        }
    })
    redirect('/dashboard')
}
