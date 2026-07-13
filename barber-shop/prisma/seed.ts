import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { images } from "../lib/images";
import { slugify } from "../lib/utils";

const prisma = new PrismaClient();

const categories = [
  { name: "Máquinas e Aparadores", slug: "maquinas-aparadores" },
  { name: "Navalhas e Lâminas", slug: "navalhas-laminas" },
  { name: "Pomadas e Finalizadores", slug: "pomadas-finalizadores" },
  { name: "Escovas e Pentes", slug: "escovas-pentes" },
  { name: "Equipamentos de Barbearia", slug: "equipamentos-barbearia" },
];

const products = [
  {
    name: "Máquina de Corte Pro Fade X500",
    description:
      "Máquina profissional sem fio com lâminas de titânio, bateria de 5 horas e alavanca de regulagem para degradês perfeitos.",
    price: 899.9,
    image: images.clipper,
    stock: 24,
    featured: true,
    category: "maquinas-aparadores",
  },
  {
    name: "Aparador de Barba Sculpt T200",
    description:
      "Aparador de precisão com 12 níveis de comprimento, design à prova d'água e lâminas duplas para contornos definidos.",
    price: 379.9,
    image: images.trimmer,
    stock: 40,
    featured: true,
    category: "maquinas-aparadores",
  },
  {
    name: "Kit Navalha Reta Clássica",
    description:
      "Navalha reta forjada à mão com correia de couro, pincel de barbear e cabo em madeira de sândalo premium.",
    price: 649.9,
    image: images.razor,
    stock: 18,
    featured: true,
    category: "navalhas-laminas",
  },
  {
    name: "Lâminas Duplo Fio Platinum (100un)",
    description:
      "Lâminas de aço inoxidável japonês com revestimento de platina para barbear suave e sem irritação.",
    price: 119.9,
    image: images.tools,
    stock: 120,
    featured: false,
    category: "navalhas-laminas",
  },
  {
    name: "Pomada Modeladora Matte Fixação Forte",
    description:
      "Pomada à base de água com fixação forte e acabamento matte natural. Pode ser remodelada durante o dia.",
    price: 89.9,
    image: images.pomade,
    stock: 85,
    featured: true,
    category: "pomadas-finalizadores",
  },
  {
    name: "Spray Texturizador Sea Salt",
    description:
      "Spray leve que adiciona volume e acabamento matte natural sem deixar o cabelo rígido.",
    price: 79.9,
    image: images.spray,
    stock: 60,
    featured: false,
    category: "pomadas-finalizadores",
  },
  {
    name: "Escova de Cerdas Naturais Premium",
    description:
      "Escova 100% cerdas naturais que distribui os óleos do cabelo, dá brilho e ajuda a modelar.",
    price: 159.9,
    image: images.brush,
    stock: 45,
    featured: true,
    category: "escovas-pentes",
  },
  {
    name: "Kit Pentes de Carbono (3 unidades)",
    description:
      "Pentes de fibra de carbono resistentes ao calor e antiestáticos. Kit com 3 tamanhos profissionais.",
    price: 69.9,
    image: images.tools,
    stock: 90,
    featured: false,
    category: "escovas-pentes",
  },
  {
    name: "Cadeira de Barbeiro Hidráulica Elite",
    description:
      "Cadeira hidráulica reforçada com encosto reclinável, base cromada e estofamento em vinil premium.",
    price: 3299.9,
    image: images.chair,
    stock: 8,
    featured: true,
    category: "equipamentos-barbearia",
  },
  {
    name: "Espelho de Bancada com LED",
    description:
      "Espelho de parede com iluminação LED ajustável e suportes para ferramentas.",
    price: 1099.9,
    image: images.mirror,
    stock: 15,
    featured: true,
    category: "equipamentos-barbearia",
  },
  {
    name: "Aquecedor de Espuma Profissional",
    description:
      "Aquecedor de espuma de barbear com aquecimento rápido, jarra de grande capacidade e controle de temperatura.",
    price: 799.9,
    image: images.barberShop,
    stock: 12,
    featured: false,
    category: "equipamentos-barbearia",
  },
  {
    name: "Balm Pós-Barba Fórmula Refrescante",
    description:
      "Balm pós-barba sem álcool com aloe vera e óleo de tea tree para acalmar e hidratar a pele.",
    price: 109.9,
    image: images.skincare,
    stock: 70,
    featured: true,
    category: "pomadas-finalizadores",
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@barbearia.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Administrador",
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: "cliente@exemplo.com",
      password: hashedPassword,
      name: "João Silva",
      role: "USER",
    },
  });

  const categoryMap = new Map<string, string>();

  for (const category of categories) {
    const created = await prisma.category.create({ data: category });
    categoryMap.set(category.slug, created.id);
  }

  for (const product of products) {
    const categoryId = categoryMap.get(product.category);
    if (!categoryId) continue;

    await prisma.product.create({
      data: {
        name: product.name,
        slug: slugify(product.name),
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        featured: product.featured,
        categoryId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
