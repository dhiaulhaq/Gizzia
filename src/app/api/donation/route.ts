import { NextResponse } from "next/server";
import { createDonation } from "@/db/models/donation";
import { z } from "zod";
import { MyResponse } from "../../../@types/types.def";

const donationInputSchema = z.object({
  amount: z.number().positive(),
  description: z.string(),
  emailProvider: z.string().email(),
  paymentDate: z.string().optional(),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    // Validasi data input menggunakan zod
    const parsedData = donationInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    // Atur nilai default untuk paymentDate jika tidak ada
    const donationData = {
      ...parsedData.data,
      paymentDate: parsedData.data.paymentDate || new Date().toISOString(),
    };

    // Panggil fungsi createDonation dengan data yang sudah diatur
    const donation = await createDonation(donationData);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Donation created successfully!",
        data: donation,
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
