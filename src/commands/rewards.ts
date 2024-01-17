import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";

import { Database } from "ydb";
import { locale } from "../utils/locale";

let langData = new Database("translation.yml");
export default {
  data: new SlashCommandBuilder()
    .setName("rewards")
    .setNameLocalizations({
      "en-US": langData.get("English").rewards.name,
      ja: langData.get("Nihongo").rewards.name,
      tr: langData.get("Turkish").rewards.name,
    })
    .setDescription("Check the role rewards of this server")
    .setDescriptionLocalizations({
      "en-US": langData.get("English").rewards.description,
      ja: langData.get("Nihongo").rewards.description,
      tr: langData.get("Turkish").rewards.description,
    }),
  run: async (client, interaction) => {
    let l = langData.get(locale(interaction)).rewards;
    if (interaction.user.bot) return;
    const db = new Database(`data/${interaction.guild.id}.json`);
    let rewards = [];
    db.all().forEach((key: any) => {
      if (key.ID.startsWith("thank_role_")) {
        const level = key.ID.split("_")[2];
        const role = interaction.guild.roles.cache.get(db.get(key.ID));
        rewards.push(`**${level} thanks**: ${role}`);
      }
    });
    if (rewards.length === 0) rewards.push(l.none);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(l.title)
          .setDescription(rewards.join("\n"))
          .setColor(Colors.Green),
      ],
    });
  },
};
