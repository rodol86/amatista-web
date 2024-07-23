import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const email = session.user.email;
      const name = session.user.name;

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/usuario/register`, {
          email,
          name,
        });

        if (response.status === 200) {
          session.apiCallSuccess = true;
        } else {
          session.apiCallSuccess = false;
        }
      } catch (error) {
        session.apiCallSuccess = false;
      }

      session.userId = token.sub;
      return session;
    },
  },
});
