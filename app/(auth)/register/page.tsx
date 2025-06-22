"use client";
import axios from "axios";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { useRouter } from "next/navigation";

const registration = cva("flex items-center flex-col py-10");
const registrationForm = cva("flex flex-col gap-2 mt-10");
const registrationFormInput = cva("border-2 border-gray-300 rounded-md p-2");

export default function Registration() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmitRegistration(formData: FormData) {
    setErrorMessage(null);
    setIsSubmitting(true);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают");
      setIsSubmitting(false);
      return;
    }

    try {
      const rawFormData = {
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("password"),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        rawFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.message);
        router.push("/login");
      } else {
        setErrorMessage(response.data.message || "Ошибка регистрации");
        return;
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const apiMessage = err.response.data?.message || "Ошибка регистрации";
        setErrorMessage(apiMessage);
      } else {
        setErrorMessage("Внутренняя ошибка сервера");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={registration()}>
      <h1 className='text-2xl'>Register</h1>
      <form
        method='POST'
        className={registrationForm()}
        action={handleSubmitRegistration}
      >
        <input
          type='text'
          name='name'
          placeholder='Name'
          className={registrationFormInput()}
        />
        <input
          type='text'
          name='surname'
          placeholder='Surname'
          className={registrationFormInput()}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          className={registrationFormInput()}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          className={registrationFormInput()}
        />
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          className={registrationFormInput()}
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
