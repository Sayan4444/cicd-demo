import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.user.createMany({
        data: [
            {
                name: 'Alice',
                email: 'alice@example.com',
            },
            {
                name: 'Bob',
                email: 'bob@example.com',
            },
            {
                name: 'Charlie',
                email: 'charlie@example.com',
            },
        ],
    });
    console.log('Demo users created');

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })