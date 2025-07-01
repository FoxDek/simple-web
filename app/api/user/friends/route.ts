import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search")?.trim() || "";
    const skip = (page - 1) * limit;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchQuery: any = {};
    if (search) {
      matchQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { surname: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const populatedUser = await User.findById(userId).populate({
      path: "friends",
      match: search ? matchQuery : {}, // Фильтрация по поиску
      select: "name surname avatar age city",
      options: {
        skip,
        limit,
      },
    });

    const totalFriends = search
      ? await User.findById(userId).populate({
          path: "friends",
          match: matchQuery,
        }).then((u) => u?.friends.length || 0)
      : user.friends.length;

    const totalPages = Math.ceil(totalFriends / limit);

    return NextResponse.json({
      friends: populatedUser?.friends || [],
      total: totalPages,
    });
  } catch (err) {
    console.error("Error fetching friends:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}