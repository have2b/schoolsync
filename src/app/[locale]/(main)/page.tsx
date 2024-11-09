import { verifySession } from '@/server';

export default async function Home() {
  const session = await verifySession();
  const role = session.role;

  if (role === 'Admin') {
    return <>Admin</>;
  }

  return <>Other</>;
}
