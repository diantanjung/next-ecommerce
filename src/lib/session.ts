import { getServerSession } from "next-auth";
import { authConfig } from "./auth";

export async function getCurrentUser() {
  const session = await getServerSession(authConfig);
  return session?.user;
}