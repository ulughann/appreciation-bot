import { GatewayIntentBits, Partials } from "discord.js";

export const intents = {
  intents: [
    GatewayIntentBits.Guilds,
  ],
  shards: 0,
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
};
