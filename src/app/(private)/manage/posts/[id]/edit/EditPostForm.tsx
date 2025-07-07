'use client';
import { useState, useActionState, useEffect } from "react";
//import { createPost } from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updatePost } from '@/lib/actions/updatePost'
import Image from "next/image";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"


type EditPostFormProps = {
    post: {
        id: string;
        title: string;
        content: string;
        topImage?: string | null;
        published: boolean;
    }
}

// タイトル、表示非表示、画像のプレビューもuseStateで変更できるように
export default function EditPostForm({post}: EditPostFormProps) {
    const [content, setContent] = useState(post.content)
    const [contentLength, setContentLength] = useState(0)
    const [preview, setPreview] = useState(false)
    const [title, setTitle] = useState(post.title)
    const [published, setPublished] = useState(post.published)
    const [imagePreview, setImagePreview] = useState(post.topImage)


    const [state, formAction] = useActionState(updatePost, {
            success: false, errors: {}
        })

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)
        setContentLength(value.length)
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    }

    useEffect(() => {
        return () => {
            if(imagePreview && imagePreview !== post.topImage) {
                URL.revokeObjectURL(imagePreview); // メモリリークを防ぐため
            }
        };
    }, [imagePreview, post.topImage]);
    

  return (
<div  className="container mx-auto mt-10">
    <h1 className="text-2xl font-bold mb-4">New Post(Markdown available)</h1> 
    <form action={formAction} className="space-y-4">        
        <div>
            <Label htmlFor="title">Title</Label> 
            <Input type="text" id="title" name="title" placeholder="Input Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            {state.errors.title && (
                        <p className='text-red-500 text-sm mt-1'>{state.errors.title.join(',')}</p>
                    )} 
        </div>
        <div>
            <Label htmlFor="topImage">トップ画像</Label>
            <Input
            type="file"
            id="topImage"
            accept="image/*"
            name="topImage"
            onChange={handleImageChange}
            />
            {imagePreview && (
                <div className="mt-2">
                    <Image src={imagePreview} alt="Image Preview" width={0} height={0} sizes="200px" className="max-w-full h-auto rounded-md" />
                </div>
            )}
            {state.errors.topImage && (
                        <p className='text-red-500 text-sm mt-1'>{state.errors.topImage.join(',')}</p>
                    )}
        </div>
        <div>
            <Label htmlFor="content">Details(Markdown)</Label>
            
        </div>
         <div className="text-right text-sm text-gray-500 mt-1">
                Text Width: {contentLength}
                <TextareaAutosize 
                    id="content" name="content" className="w-full border p-2" placeholder="Markdown形式で入力してください"
                    minRows={8} value={content} onChange={handleContentChange} />
                {state.errors.content && (
                        <p className='text-red-500 text-sm mt-1'>{state.errors.content.join(',')}</p>
                    )}

            </div>    
            <div className="text-right text-sm text-gray-200">
                # of characotors : {contentLength}
            </div>
            <div>
                <Button type="button" onClick={()=> setPreview(!preview)}>
                    {preview ? 'close this preview' : 'show preview'}
                </Button>
            </div>  
            {preview && (
                <div className="border p-4 bg-gray-50 prose max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        skipHtml={false} // HTMLスキップを無効化
                        unwrapDisallowed={true}// Markdownの改行を解釈
                        >{content}</ReactMarkdown>
                </div>
            )}
             <RadioGroup value={published.toString()} name="published" onValueChange={(value) => setPublished(value === 'true')}>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="true" id="published-one" />
                    <Label htmlFor="published-one">View</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="false" id="published-two" />
                    <Label htmlFor="published-two">Hide</Label>
                </div>               
            </RadioGroup>
            
            <Button type="submit" className="bg-glue-500 text-green-700 px-4 py-2 rounded-sm">Edit this article</Button>
            <input type="hidden" name="postId" value={post.id} /> // 記事id
            <input type="hidden" name="oldImageUrl" value={post.topImage || ''} />
    </form>
    </div>
  )
}
