import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        if (!req.query.userid) { 
            return res.json({"error": "Specify a user id"})
        }
      const resp = await prisma.user.findUnique({
          where: {
            id: typeof(req.query.userid) == "string" ? req.query.userid:req.query.userid[0]
          }
      })
  }
}
