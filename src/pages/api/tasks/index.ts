import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";

const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method == "GET") {
      const tasks = await prisma.task.findMany({
        where: {
          userId: session?.user?.id,
        },
        orderBy: {
          createdAt: "desc",
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

        return res.status(201).json(task);
      }
    } else {
      return res.status(405).json({ Error: "Method not allowed" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
