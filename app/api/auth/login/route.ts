import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Нужно заполнить все поля" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Нет такого пользователя" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Неверный пароль" }, { status: 401 });
    }

    const accessToken = jwt.sign(
      {
        name: user.name,
        surname: user.surname,
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json(
      { message: "Успешная авторизация" },
      { status: 200 }
    );

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 15,
    })

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })
    
    return res;

  } catch (err) {
    console.error("Ошибка авторизации: ", err);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
