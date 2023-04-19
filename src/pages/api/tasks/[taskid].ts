import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const parse = z.string().safeParse(req.query.taskid);
  const taskid = parse.success ? parse.data : "";
  if (session) {
    if (req.method == "GET") {
      const getTask = await prisma.task.findUnique({
        where: {
          id: taskid,
        },
      });
      return res.json(getTask);
    } else if (req.method == "DELETE") {
      const deleteTask = await prisma.task.delete({
        where: {
          id: taskid,
        },
      });
      return res.json(deleteTask);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
