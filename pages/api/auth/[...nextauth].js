import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify guilds" } }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.discordId = profile.id;
        token.name = profile.global_name || profile.username;
        token.image = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`
          : null;
      }
      token.isPolice = false;
      token.isChief = false;
      if (token.discordId === process.env.POLICE_ROLE_ID) token.isPolice = true;
      if (token.discordId === process.env.CHIEF_ROLE_ID) token.isChief = true;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.discordId;
      session.user.name = token.name;
      session.user.image = token.image;
      session.user.isPolice = token.isPolice;
      session.user.isChief = token.isChief;
      return session;
    }
  }
});
