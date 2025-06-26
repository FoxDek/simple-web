import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utils/token.utils";

export async function getCurrentUser() {

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if(!token) {
    console.log('Токен доступа отсутствует')
    return null;
  };

  try {

    // const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // return payload;

    const tokenVerified = await verifyAccessToken(token);
    const { payload } = tokenVerified;
    return payload;

  } catch (err) {
    console.error('Ошибка: ', err)
    return null
  }
}


