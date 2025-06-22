import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function getCurrentUser() {

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if(!token) {
    console.log('Токен доступа отсутствует')
    return null;
  };

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return payload;
  } catch (err) {
    console.error('Ошибка: ', err)
    return null
  }
}


