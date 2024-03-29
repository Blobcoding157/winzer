import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getUserBySessionToken, updateUser } from '../../../../database/users';

// change as soon as possible
export type ProfileResponseBodyGet =
  | { error: string }
  | {
      user: { id: number; username: string } | undefined;
    };

export type ProfileResponseBodyPut =
  | { error: string }
  | {
      user: { id: number; username: string } | undefined;
    };

export async function GET(): Promise<NextResponse<ProfileResponseBodyGet>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'user not found' });
  }
  // 4. return the user profile

  return NextResponse.json({ user: user });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string[]> },
): Promise<NextResponse<ProfileResponseBodyPut>> {
  const userId = Number(params.userId);
  if (!userId) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 });
  }

  const body = await request.json();

  const newUser = await updateUser(body.id, body.aboutMe);

  return NextResponse.json({ user: newUser });
}
