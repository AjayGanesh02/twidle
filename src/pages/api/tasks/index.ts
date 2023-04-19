import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { z } from "zod";
import { getSession } from "next-auth/react";

const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    if (req.method == "GET") {
      const tasks = await prisma.task.findMany({
        where: {
          userId: session?.user?.id,
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
            user: { connect: { id: session?.user?.id } },
            title: resp.data.title,
            description: resp.data.description || "",
          },
        });

        return res.status(200).json(task);
      }
    }
  } else { 
    res.status(401).send({ message: "Unauthorized" });
  }
}