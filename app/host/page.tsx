import { cookies } from 'next/headers';
import { getUserBySessionToken } from '../../database/users';
import HostForm from './HostForm';

export default async function HostPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);
  return <HostForm user={user} />;
}
