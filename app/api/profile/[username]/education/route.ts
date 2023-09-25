import getCurrentUser from "@/app/api/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const body = await request.json();
    const { title, fromYear, toYear, university, description, location } = body;

    if (!params.username || !fromYear || !toYear) {
      return new NextResponse("Missing fields!", {
        status: 400,
      });
    }

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthenticated, authentication required!", {
        status: 400,
      });
    }

    const profile = await prismadb.profile.findFirst({
      where: {
        username: params.username,
        userId: currentUser.id,
      },
    });
    if (!profile) {
      return new NextResponse("No profile found with this informations", {
        status: 400,
      });
    }

    const education = await prismadb.education.create({
      data: {
        title,
        location,
        fromYear,
        toYear,
        university,
        description,
        profileId: profile.username,
      },
    });
    return NextResponse.json(education);
  } catch (error) {
    return new NextResponse("Something went wrong");
  }
}
