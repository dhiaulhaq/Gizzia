import { NextResponse } from "next/server";
import {
  getUsers,
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "@/db/models/user";
import { z } from "zod";
import { MyResponse } from "../types.def";

const userInputSchema = z.object({
  name: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const GET = async () => {
  const users = await getUsers();

  return Response.json(
    {
      statusCode: 200,
      message: "Fetch all users success!",
      data: users,
    },

    {
      status: 200,
    }
  );
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const parsedData = userInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const { username, email } = parsedData.data;

    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `Email - Already in use`,
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByUsername = await getUserByUsername(username);
    if (existingUserByUsername) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `Username - Already in use`,
        },
        {
          status: 400,
        }
      );
    }

    const user = await createUser(parsedData.data);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "User created successfully!",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err);

      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error!",
      },
      {
        status: 500,
      }
    );
  }
};
