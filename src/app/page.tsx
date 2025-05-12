import { prisma } from '@/lib/prisma';

export default async function Home() {
  const users = await prisma.usuarios.findMany();
  console.log(users);

  return <p>Hello, World!!</p>;
}
