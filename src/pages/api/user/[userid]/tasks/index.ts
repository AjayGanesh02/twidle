import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    console.log(prisma.task.count());
  }
}
