import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import mongoose from "mongoose";
import User from "../../../Models/User";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "your password",
        },
      },
      authorize: async (credentials, req) => {
        try {
          await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
          const userExists = await User.findOne({ email: credentials.email });
          if (userExists) {
            if (credentials.password === userExists.password) {
              const data = {
                id: userExists._id,
                name:
                  userExists.name ??
                  userExists.fName.concat(" ", userExists.lName),
                email: userExists.email,
              };
              return Promise.resolve(data);
            } else {
              return Promise.reject(null);
            }
          } else {
            return Promise.reject(null);
          }
        } catch (error) {
          return Promise.reject(new Error(error));
        }
      },
    }),
    // ...add more providers here
  ],
  // pages: {
  //   signIn: "/login",
  //   signOut: "/",
  //   error: "/login",
  // },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
  debug: true,

  // callbacks: {
  //   session: async ({ session, token }) => {
  //     session.user = token;
  //     return session;
  //   },
  //   jwt: async ({ user, token, account }) => {
  //     if (user) {
  //       token = Object.assign(token, {
  //         uid: user.id,
  //         provider: account.provider,
  //         name: user.name,
  //         email: user.email,
  //       });
  //     }
  //     return token;
  //   },
  // },
};
export default NextAuth(authOptions);
