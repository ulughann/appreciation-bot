import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Colors, PermissionFlagsBits } from "discord.js";

import moment from "moment";
import { Database } from "ydb";

let langData = new Database("translation.yml");
import { locale } from "../../utils/locale";

export default {
  data: new SlashCommandBuilder()
    .setName("set-thanks")
    .setNameLocalizations({
      "en-US": langData.get("English").set_thanks.name,
      ja: langData.get("Nihongo").set_thanks.name,
    })
    .setDescription("Sets the amount of thanks someone has")
    .setDescriptionLocalizations({
      "en-US": langData.get("English").set_thanks.description,
      ja: langData.get("Nihongo").set_thanks.description,
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to modify")
        .setRequired(true)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").set_thanks.amount,
          ja: langData.get("Nihongo").set_thanks.amount,
        })
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of thanks to set")
        .setRequired(true)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").set_thanks.num,
          ja: langData.get("Nihongo").set_thanks.num,
        })
    ),
  run: async (client, interaction) => {
    let l = langData.get(locale(interaction)).set_thanks;
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(l.warn1)
            .setColor(Colors.Red),
        ],
      });

    const db = new Database(`data/${interaction.guild.id}.json`);
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");
    if (!user)
      return interaction.reply({ content: l.warn2 });
    if (!amount)
      return interaction.reply({ content: l.warn3 });

    await db.set(`thanks.${user.id}`, amount);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(l.success)
          .setDescription(
            (l.success_desc).replace("%user", user).replace("%num", db.get(`thanks.${user.id}`))
          )
          .setColor(Colors.Green),
      ],
    });
  },
};
