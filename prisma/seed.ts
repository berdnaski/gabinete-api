import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { name: 'Infraestrutura Viária' },
  { name: 'Iluminação Pública' },
  { name: 'Saneamento Básico' },
  { name: 'Saúde' },
  { name: 'Educação' },
  { name: 'Segurança Pública' },
  { name: 'Meio Ambiente' },
  { name: 'Habitação' },
  { name: 'Transporte Público' },
  { name: 'Assistência Social' },
  { name: 'Esporte e Lazer' },
  { name: 'Cultura' },
  { name: 'Animal Urbano' },
  { name: 'Economia e Trabalho' },
  { name: 'Outros' },
];

async function main() {
  console.log('🌱 Iniciando seed...');

  let cabinet = await prisma.cabinet.findUnique({ where: { slug: 'gabinete-demo' } });
  if (!cabinet) {
    cabinet = await prisma.cabinet.create({
      data: {
        name: 'Gabinete Demo',
        slug: 'gabinete-demo',
        isActive: true,
      },
    });
    console.log(`✅ Cabinet criado: ${cabinet.name}`);
  } else {
    console.log(`ℹ️  Cabinet já existe: ${cabinet.name}`);
  }

  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@gabinete.com' } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@gabinete.com',
        password: hashedPassword,
        role: 'ADMIN',
        cabinetId: cabinet.id,
      },
    });
    console.log('✅ Admin criado: admin@gabinete.com / Admin@123');
  } else {
    console.log('ℹ️  Admin já existe');
  }

  let criadas = 0;
  let existentes = 0;

  for (const cat of CATEGORIES) {
    const exists = await prisma.category.findFirst({
      where: { name: cat.name },
    });

    if (!exists) {
      await prisma.category.create({
        data: { name: cat.name, isActive: true },
      });
      criadas++;
    } else {
      existentes++;
    }
  }

  console.log(`✅ Categorias criadas: ${criadas} | Já existiam: ${existentes}`);
  console.log('🎉 Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
