import { cache } from 'react';
import { sql } from './conect';

export type User = {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  role_id: number;
  passwordHash: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUsers = cache(async () => {
  const user = await sql<User[]>`
      SELECT * FROM users
    `;
  return user;
});

export const getUsersById = cache(async (id: number) => {
  const user = await sql<User[]>`
      SELECT * FROM user WHERE id = ${id}
    `;
  return user;
});

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<
    {
      id: number;
      username: string;
      profilePicture: string;
      csrfSecret: string;
    }[]
  >`
    SELECT
      users.id,
      users.username,
      users.profile_picture,
      sessions.csrf_secret
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<
    {
      id: number;
      username: string;
      profilePicture: string;
      email: string;
      role_id: number;
    }[]
  >`
    SELECT
      id,
      username, email, profile_picture, role_id, password_hash
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const createUser = cache(
  async (
    username: string,
    email: string,
    profilePicture: string,
    role_id: number,
    passwordHash: string,
  ) => {
    const [user] = await sql<
      {
        id: number;
        username: string;
        email: any;
        profilePicture: string;
        role_id: number;
      }[]
    >`
      INSERT INTO users
        (username, email, profile_picture, role_id, password_hash)
      VALUES
        (${username}, ${email}, ${profilePicture}, ${role_id}, ${passwordHash})
      RETURNING
        id, username, profile_picture, email, role_id
    `;
    return user;
  },
);
