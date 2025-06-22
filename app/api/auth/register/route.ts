import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, surname, email, password } = await req.json();

    if (!name || !surname || !email || !password) {
      return NextResponse.json(
        { message: "Нужно заполнить все поля!" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Пользователь с такой почтой уже есть" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
    })

    return NextResponse.json({ message: "Регистрация успешна: ", userId: newUser._id }, { status: 201 });

  } catch (err) {
    console.error("Ошибка регистрации: ", err);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
