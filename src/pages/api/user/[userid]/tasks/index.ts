import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { z } from "zod";

const taskSchema = z.object({
  userid: z.string(),
  title: z.string(),
  description: z.string().optional(),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    if (typeof req.query.userId != "string") {
      return res.status(400).json({ error: "Specify a userid" });
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId: typeof req.query.userid === "string" ? req.query.userid : "",
      },
    });

    return res.status(200).json(tasks);
  } else if (req.method == "POST") { 

  }
}
