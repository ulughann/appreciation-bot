import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";

import { Database } from "ydb";
import { locale } from "../utils/locale";

let langData = new Database("translation.yml");
export default {
  data: new SlashCommandBuilder()
    .setName("info")
    .setNameLocalizations({
      "en-US": langData.get("English").info.name,
      ja: langData.get("Nihongo").info.name,
    })
    .setDescription("Check how many thanks you or a given user has")
    .setDescriptionLocalizations({
      "en-US": langData.get("English").info.description,
      ja: langData.get("Nihongo").info.description,
    })
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to check (optional)")
        .setRequired(false)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").info.role_description_1,
          ja: langData.get("Nihongo").info.role_description_1,
        })
    ),
  run: async (client, interaction) => {
    let l = langData.get(locale(interaction)).info;
    if (interaction.user.bot) return;
    const db = new Database(`data/${interaction.guild.id}.json`);
    const user = interaction.options.getUser("user") || interaction.user;
    if (!user)
      return interaction.reply({ content: l.warn1 });

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(l.title)
          .setDescription(
            (l.desc).replace("%user", user).replace("%num", db.get(`thanks.${user.id}`) || 0)
          )
          .setColor(Colors.Green),
      ],
    });
  }
};
