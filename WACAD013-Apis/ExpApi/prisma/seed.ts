import { prisma } from "../src/utils/prismaClient";
import { UserTypes } from "../src/resources/user_type/user_type.constants";

async function seed() {
  return prisma.userType.createMany({
    data: [
      { id: UserTypes.ADMIN, label: "admin" },
      { id: UserTypes.CLIENT, label: "client" },
    ],
    skipDuplicates: true,
  });
}

seed()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

export default seed;
