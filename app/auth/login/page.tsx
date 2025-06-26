"use client";

import { cva } from "class-variance-authority";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Стили для компонента Login
const login = cva("login flex items-center flex-col");
const loginHint = cva("loginHint w-full flex justify-center bg-gray-100 border-b border-gray-200 absolute py-5 px-5 text-sm");
const loginSubstrate = cva("loginSubstrate mt-30 bg-white p-5 rounded-xl border border-gray-200");
const loginTitle = cva("loginTitle text-2xl text-center");
const loginForm = cva("loginForm flex flex-col gap-2 mt-10");
const loginFormInput = cva("loginFormInput border-2 border-gray-300 rounded-md p-2");
const formError = cva("loginError text-red-500 text-sm p-2 bg-red-50 rounded");
const loginButton = cva('loginButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5', {
  variants: {
    active: {
      true: 'bg-gray-400 cursor-not-allowed',
      false: 'bg-gray-700 text-white'
    }
  }
})

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
        setIsSubmitting(false);
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
      <div className={loginHint()}>Для продолжения Вам нужно войти в Simple Web</div>
      <div className={loginSubstrate()}>
        <h1 className={loginTitle()}>Login</h1>
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
            <div className={formError()}>
              {errorMessage}
            </div>
          )}

          <button
            type='submit'
            className={loginButton({ active: isSubmitting })}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
