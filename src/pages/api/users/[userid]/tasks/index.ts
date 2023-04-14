import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.query.userid != "string") {
    return res.status(400).json({ Error: "Specify a userid" });
  }
  if (req.method == "GET") {
    const tasks = await prisma.task.findMany({
      where: {
        userId: typeof req.query.userid === "string" ? req.query.userid : "",
      },
    });

    return res.status(200).json(tasks);
  } else if (req.method == "POST") {
    const resp = taskSchema.safeParse(req.body);
    if (!resp.success) {
      return res.status(400).json({ Error: "Malformed Request" });
    } else {
      const task = await prisma.task.create({
        data: {
          user: { connect: { id: req.query.userid } },
          title: resp.data.title,
          description: resp.data.description || "",
        },
      });

      return res.status(200).json(task);
    }
  }
}
