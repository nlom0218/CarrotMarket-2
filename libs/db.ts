import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function test() {
  const token = await db.sMSToken.create({
    data: {
      token: '123123123',
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });

  console.log(token);
}

test();

export default db;
