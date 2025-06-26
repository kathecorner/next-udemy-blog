'use client'
import { useState, useActionState } from "react";
import createPost from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'



export default function CreatePage() {
    const [content, setContent] = useState('')
    const [contentLength, setContentLength] = useState(0)

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)
        setContentLength(value.length)
    }


  return (
    <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">New Post(Markdown available)</h1>
        <form className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" name="title" placeholder="Input Title" />
            </div>
            <div>
                <Label htmlFor="content">Details(Markdown)</Label>
                <TextareaAutosize
                    id="content" name="content" className="w-full border p-2" placeholder="Input with Markdown format" minRows={8} value={content} onChange~{handleContentChange} />

            </div>
            <div className="text-right text-sm text-gray-500 mt-1">
                Text Width: {contentLength}

            </div>

        </form>
      
    </div>
  )
}
