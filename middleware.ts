import { NextRequest, NextResponse } from "next/server";
import { signAccessToken, verifyAccessToken, verifyRefreshToken } from "./utils/token.utils";


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 1. Пропускаем статические и API маршруты
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith(".")
  ) {
    return NextResponse.next();
  }

  // --- 2. Получаем токены из кук
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthPage = pathname.startsWith("/auth");

  // --- 3. Если accessToken есть и валиден — пропускаем
  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      // Если пользователь на /auth, но уже залогинен — редирект на /
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    } catch (err) {
      console.log('Ошибка проверки токена доступа: ', err)
    }
  }

  // --- 4. Если есть refreshToken — пробуем обновить токен
  if (refreshToken) {
    try {
      const { payload } = await verifyRefreshToken(refreshToken);
      const newAccessToken = await signAccessToken({
        userId: payload.userId,
      });

      const res = NextResponse.next();

      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 15, // 15 минут
        sameSite: "lax",
        secure: true,
      });

      // Если пользователь на /auth, редирект на /
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return res;
    } catch (err) {
      console.error("Ошибка при верификации refreshToken:", err);
      // Refresh недействителен — удаляем куки
      const res = NextResponse.redirect(new URL("/auth/login", request.url));
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");

      return res;
    }
  }

  // --- 5. Если это auth-страница — пропускаем
  if (isAuthPage) {
    return NextResponse.next();
  }

  // --- 6. Нет валидных токенов — редирект на логин
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

// Ограничение по путям
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
