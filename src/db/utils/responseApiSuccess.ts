import type { NextApiResponse } from "next";

export function responseApiSuccess<T>(res: NextApiResponse, data: T) {
  res.status(200).json({
    status: true,
    statusCode: 200,
    message: "Transaction created successfully.",
    data: data,
  });
}
