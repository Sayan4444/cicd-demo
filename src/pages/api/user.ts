import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
  id: number;
  name: string;
  email: string;
  role: string;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      await GET(req, res);
    } else if (req.method === "POST") {
      await POST(req, res);
    }
    else if (req.method === "DELETE") {
      await DELETE(req, res);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function GET(req: NextApiRequest,
  res: NextApiResponse,) {
  const users = await prisma.user.findMany() as Data;
  res.status(200).json(users);
}

async function POST(req: NextApiRequest,
  res: NextApiResponse,) {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@example.com',
        role: "ADMIN"
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        role: "USER1"
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        role: "USER1"
      },
    ],
  });
  res.status(201).json({ message: 'Demo users created' });
}

async function DELETE(req: NextApiRequest,
  res: NextApiResponse,) {
  await prisma.user.deleteMany();
  res.status(200).json({ message: 'Demo users deleted' });
}