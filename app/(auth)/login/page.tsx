"use client";

import { cva } from "class-variance-authority";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const login = cva("flex items-center flex-col py-10")
const loginForm = cva("flex flex-col gap-2 mt-10")
const loginFormInput = cva("border-2 border-gray-300 rounded-md p-2")

export default function Page() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  async function handleFormSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const rawFormData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        rawFormData
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.message);
        router.push("/");
      } else {
        setErrorMessage(response.data.message || "Ошибка входа");
        return;
      }

    } catch (err) {
      
      if (axios.isAxiosError(err) && err.response) {
        const apiMessage = err.response.data?.message || 'Ошибка авторизации';
        setErrorMessage(apiMessage)
      } else {
        setErrorMessage('Внутренняя ошибка сервера')
      }

    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={login()}>
      <h1 className='text-2xl'>Login</h1>
      <form action={handleFormSubmit} className={loginForm()}>
        <input
          type='text'
          name='email'
          placeholder='email'
          className={loginFormInput()}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className={loginFormInput()}
          required
        />

        {errorMessage && (
          <div className='text-red-500 text-sm p-2 bg-red-50 rounded'>
            {errorMessage}
          </div>
        )}

        <button
          type='submit'
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-700 text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
