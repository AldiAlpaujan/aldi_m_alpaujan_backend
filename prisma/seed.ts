import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.productCategory.deleteMany();

  await prisma.productCategory.createMany({
    data: [
      {
        id: 1,
        name: 'Elektronik',
      },
      {
        id: 2,
        name: 'Furniture',
      },
      {
        id: 3,
        name: 'Home Appliances',
      },
      {
        id: 4,
        name: 'Food and Beverages',
      },
      {
        id: 5,
        name: 'Personal Care',
      },
      {
        id: 6,
        name: 'Pet Care',
      },
      {
        id: 7,
        name: 'Sports and Outdoors',
      },
      {
        id: 8,
        name: 'Toys and Games',
      },
      {
        id: 9,
        name: 'Vehicles',
      },
      {
        id: 10,
        name: "Women's Fashion",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
