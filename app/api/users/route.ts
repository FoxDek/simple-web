import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

  await connectDB()

  // const users = await User.find().select('name age city avatar');
  
  // return NextResponse.json(
  //   users
  // );

  const {searchParams} = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const search = searchParams.get('search')?.trim() || '';
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { surname: { $regex: search, $options: 'i' } },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(query)
      .skip(skip)
      .limit(limit)
      .select('name surname age city avatar'),
    User.countDocuments(query),
  ])
  

  return NextResponse.json(
    {
      users,
      total,
      page
    }
  );
}