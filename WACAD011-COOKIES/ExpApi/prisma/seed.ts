import { prisma } from "../src/utils/prismaClient";
import { UserTypesEnum } from "../src/resources/user_type/user_type.constants";

async function seed() {
  return prisma.userType.createMany({
    data: [
      { id: UserTypesEnum.ADMIN, label: "admin" },
      { id: UserTypesEnum.CLIENT, label: "client" },
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
