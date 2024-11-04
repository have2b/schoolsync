import { verifySession } from '@/funcs';

export default async function Home() {
  const session = await verifySession();
  const role = session.role;

  if (role === 'Admin') {
    return <>Admin</>;
  }

  return <>Other</>;
}
