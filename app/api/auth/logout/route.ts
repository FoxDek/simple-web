// import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST() {
  
  try {
    // const cookieStore = await cookies();
  
    // cookieStore.delete('accessToken')
    // cookieStore.delete('refreshToken')

    // return NextResponse.json(
    //   { message: "Выход выполнен" },
    //   { status: 200 }
    // );

    const response = NextResponse.json(
      { message: "Выход выполнен" },
      { status: 200 }
    );

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;

  } catch (err) {
    console.error('Ошибка во время выхода: ', err)
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }


}