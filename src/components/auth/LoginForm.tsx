'use client';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authenticate';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )
  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
         
          <div className='space-y-2'>
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="test@test.com" />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="email">password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="**********" />
          </div>
          <Button type='submit' className="w-full">ログイン</Button>
          <div
          className="flex h-8 items-end space-x-1"          
        >
          {errorMessage && (
            <div className="text-sm text-red-500">
            
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>
          </form>
          </CardContent>
          </Card>
  )

}