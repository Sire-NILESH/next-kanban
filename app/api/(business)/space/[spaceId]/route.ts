import AppError from "@/lib/AppError";
import dbConnect from "@/lib/dbConnect";
import ErrorHandler, { ExtendedError } from "@/lib/errorHandler";
import Space from "@/models/spaceModel";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    spaceId: string;
  };
};

export async function GET(
  request: NextRequest,
  { params: { spaceId } }: Props
) {
  try {
    await dbConnect();

    const doc = await Space.findById(spaceId).lean();

    if (!doc) {
      throw new AppError("No document found for that id", 404);
    }

    return NextResponse.json(
      { status: "success", data: { data: doc } },
      { status: 200 }
    );
  } catch (error) {
    const err = ErrorHandler(error as ExtendedError, request);
    return NextResponse.json(err, {
      status: err?.statusCode ? err.statusCode : 500,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params: { spaceId } }: Props
) {
  try {
    await dbConnect();

    const userId = request.nextUrl.searchParams.get("userId");
    const reqBody = await request.json();

    if (reqBody.name === undefined || typeof reqBody.name !== typeof "") {
      throw new AppError(
        "Insufficient or incorrect parameters for update",
        400
      );
    }

    const doc = await Space.findById(spaceId);

    if (!doc) {
      throw new AppError("No document found for that id", 404);
    } else if (doc.userId !== userId) {
      throw new AppError("Insufficient permissions", 403);
    }

    // for now we only support changing the 'name' of the SPACE for EDIT option.
    doc.name = reqBody.name as string;

    const updatedDoc = await doc.save();

    return NextResponse.json(
      {
        status: "success",
        data: {
          data: updatedDoc,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const err = ErrorHandler(error as ExtendedError, request);
    return NextResponse.json(err, {
      status: err?.statusCode ? err.statusCode : 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { spaceId } }: Props
) {
  try {
    await dbConnect();

    const userId = request.nextUrl.searchParams.get("userId");

    const doc = await Space.findById(spaceId);

    if (!doc) {
      throw new AppError("No document found for that id", 404);
    } else if (doc.userId !== userId) {
      throw new AppError("Insufficient permissions", 403);
    }

    await Space.findByIdAndDelete(spaceId);

    // alternate solution
    // return new Response(null, {
    //   status: 204,
    // });

    // NextResponse currently does not support 204(content deleted) status code hence using 200 here.
    return NextResponse.json(
      {
        status: "success",
        deleted: true,
        data: {
          data: null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const err = ErrorHandler(error as ExtendedError, request);
    return NextResponse.json(err, {
      status: err?.statusCode ? err.statusCode : 500,
    });
  }
}
