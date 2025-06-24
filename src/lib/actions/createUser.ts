'use server'

import { authenticate } from '@/lib/actions/authenticate';
import { registerSchema } from "@/validations/user"
import { prisma } from '@/lib/prisma'
import bcryptjs  from 'bcryptjs'
import { signIn } from '@/auth'
import { redirect } from "next/navigation"
import { ZodError } from 'zod';

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

function handleValidationError(error: ZodError): ActionState {
    const { fieldErrors, formErrors } = error.flatten();
    const castedFieldErrors = fieldErrors as Record<string, string[]>
    // zodの仕様でパスワード一致確認のエラーは formErrorsで渡ってくる
    // formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
    if (formErrors.length > 0) {
        return { success: false, errors: { ...fieldErrors, confirmPassword: formErrors
    }}}
        return { success: false, errors: castedFieldErrors };
    }
    // カスタムエラー処理
    function handleError(customErrors: Record<string, string[]>): ActionState {
        return { success: false, errors: customErrors };
}


export async function createUser(
    prevState: ActionState, 
    formData: FormData
): Promise<ActionState>

{
    //obtain info from form
    const rawFormData = Object.fromEntries(
        ["name", "email", "password", "confirmPassword"].map(field => [
            field,
            formData.get(field) as string
        ])
    ) as Record<string, string>

    //validation
    const validationResult = registerSchema.safeParse(rawFormData)
    if(!validationResult.success){
        return handleValidationError(validationResult.error)}
    //check the user exists in the DB or not
    const existingUser = await prisma.user.findUnique({
        where : { email: rawFormData.email }
    })
    if (existingUser){
        return handleError({email: ['this email has been registered before']})
    }
    

    //register
    const hashedPassword = await bcryptjs.hash(rawFormData.password,12)

    await prisma.user.create({
        data: {
            name: rawFormData.name,
            email: rawFormData.email,
            password: hashedPassword
        }
    })

    //redirect to dashboard
     await signIn('credentials', {
          ...Object.fromEntries(formData),
          redirect: false
      })

      redirect('/dashboard')
}