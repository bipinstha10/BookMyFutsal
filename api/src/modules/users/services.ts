import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { env } from "../../config/env";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const getUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user;
};

export const getUserById = async (id: number) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return user;
};

export const createUser = async (userInput: typeof usersTable.$inferInsert) => {
  return await db.insert(usersTable).values(userInput).returning();
};

export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

export const comparePassword = async (password: string, hash: string) => {
  return await argon2.verify(hash, password);
};

export async function updateRefreshToken(
  id: number,
  refreshToken: string | null
) {
  const [user] = await db
    .update(usersTable)
    .set({ refreshToken: refreshToken ?? "" })
    .where(eq(usersTable.id, id))
    .returning();

  return user;
}

export function generateAccessToken(user: {
  id: number;
  email: string;
  name: string;
}) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

export function generateRefreshToken(user: { id: number }) {
  return jwt.sign(
    {
      id: user.id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    }
  );
}

export async function generateAccessAndRefreshTokens(userId: number) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const { id, email, name } = user;

  const accessToken = generateAccessToken({ id, email, name });

  const refreshToken = generateRefreshToken({ id });

  await db
    .update(usersTable)
    .set({ refreshToken })
    .where(eq(usersTable.id, id));

  return { accessToken, refreshToken };
}
