import { DefaultSession } from "next-auth";

import { User } from ".";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      info: User;
      accessToken: string;
      refreshToken: string;
    };
  }
}
