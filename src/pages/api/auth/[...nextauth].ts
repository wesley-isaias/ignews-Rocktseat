import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const email= user.user?.email || user.email;
         
      await fauna.query (
        q.Create(
          q.Collection('users'),
          {data: { email }}
        )
      )
      return true;
    },
  },
};

export default NextAuth(authOptions);

  /*
  quando um usuário realizar o logout, suas informações serão removidas do banco de dados.
  
  callbacks: {
    async signIn(user, account, profile) {
      const email = user.user?.email || user.email;

      await fauna.query(
        q.If(
          q.Not(q.Exists(q.Match(q.Index("user_by_email"), email))),
          q.Create(q.Collection("users"), { data: { email } }),
          q.Get(q.Match(q.Index("user_by_email"), email))
        )
      );

      return true;
    },
    async signOut(user, account, profile) {
      const email = user.email;

      await fauna.query(
        q.Delete(q.Select(["ref"], q.Get(q.Match(q.Index("user_by_email"), email))))
      ); */
