import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Colors, PermissionFlagsBits } from "discord.js";

import moment from "moment";
import { Database } from "ydb";

let langData = new Database("translation.yml");
import { locale } from "../../utils/locale";

export default {
  data: new SlashCommandBuilder()
    .setName("delete-role-reward")
    .setNameLocalizations({
      "en-US": langData.get("English").remove_role_reward.name,
      ja: langData.get("Nihongo").remove_role_reward.name,
      tr: langData.get("Turkish").remove_role_reward.name,
    })
    .setDescription("Removes a given role reward")
    .setDescriptionLocalizations({
      "en-US": langData.get("English").remove_role_reward.description,
      ja: langData.get("Nihongo").remove_role_reward.description,
      tr: langData.get("Turkish").remove_role_reward.description,
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of thanks to set")
        .setRequired(true)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").remove_role_reward.amount,
          ja: langData.get("Nihongo").remove_role_reward.amount,
          tr: langData.get("Turkish").remove_role_reward.amount,
        })
    ),
  run: async (client, interaction) => {
    let l = langData.get(locale(interaction)).remove_role_reward;
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
      return interaction.reply({
        embeds: [new EmbedBuilder().setTitle(l.warn1).setColor(Colors.Red)],
      });

    const db = new Database(`data/${interaction.guild.id}.json`);
    const amount = interaction.options.getInteger("amount");
    if (!amount) return interaction.reply({ content: l.warn2 });

    await db.delete(`thank_role_${amount}`);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(l.success)
          .setDescription(l.desc.replace("%num", amount))
          .setColor(Colors.Green),
      ],
    });
  },
};
