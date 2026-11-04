import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@12345", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bpc.local" },
    update: {},
    create: {
      email: "admin@bpc.local",
      name: "Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log("Created super admin:", admin.email);

  const championship = await prisma.championship.upsert({
    where: { id: "default-championship" },
    update: {},
    create: {
      id: "default-championship",
      name: "Business Plan Championship",
      tagline: "Turn Your Business Idea Into a Winning Plan",
      edition: "2025",
      overview: "A premier two-day business plan pitching championship.",
      primaryColor: "#0c8ee6",
      secondaryColor: "#dc8f22",
      timezone: "Asia/Kolkata",
      contactEmail: "info@businessplanchampionship.org",
      isActive: true,
    },
  });

  console.log("Created championship:", championship.name);

  const tracks = [
    "Technology & Digital",
    "Sustainability & Climate",
    "Healthcare & Life Sciences",
    "Education & EdTech",
    "Consumer Products & Services",
    "Open Innovation",
  ];

  for (let i = 0; i < tracks.length; i++) {
    await prisma.track.create({
      data: {
        championshipId: championship.id,
        name: tracks[i],
        sortOrder: i,
        isActive: true,
      },
    });
  }

  console.log("Seeded tracks");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
