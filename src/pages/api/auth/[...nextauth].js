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
      const googleId = token.sub; // Google user ID

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/usuario/register`, {
          email: email,
          name: name,
          googleId: googleId,
        });

        if (response.status === 200) {
          session.apiCallSuccess = true;
          console.log('User registered successfully:', response.data);
        } else {
          session.apiCallSuccess = false;
          console.error('Failed to register user:', response.status);
        }
      } catch (error) {
        session.apiCallSuccess = false;
        console.error('API call error:', error);
      }

      session.userId = token.sub;
      return session;
    },
  },
});
