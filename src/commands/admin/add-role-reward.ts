import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Colors, PermissionFlagsBits } from "discord.js";

import moment from "moment";
import { Database } from "ydb";

let langData = new Database("translation.yml");
import { locale } from "../../utils/locale";

export default {
  data: new SlashCommandBuilder()
    .setName("add-role-reward")
    .setNameLocalizations({
      "en-US": langData.get("English").add_role_reward.name,
      ja: langData.get("Nihongo").add_role_reward.name,
      tr: langData.get("Turkish").add_role_reward.name,
    })
    .setDescription("Sets a role to give as a reward for a certain amount of thanks")
    .setDescriptionLocalizations({
      "en-US": langData.get("English").add_role_reward.description,
      ja: langData.get("Nihongo").add_role_reward.description,
      tr: langData.get("Turkish").add_role_reward.description,
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of thanks to set")
        .setRequired(true)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").add_role_reward.amount,
          ja: langData.get("Nihongo").add_role_reward.amount,
          tr: langData.get("Turkish").add_role_reward.amount,
        })
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to give")
        .setRequired(true)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").add_role_reward.role,
          ja: langData.get("Nihongo").add_role_reward.role,
          tr: langData.get("Turkish").add_role_reward.role,
        })
    ),
  run: async (client, interaction) => {
    let l = langData.get(locale(interaction)).add_role_reward;
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(l.warn1)
            .setColor(Colors.Red),
        ],
      });

    const db = new Database(`data/${interaction.guild.id}.json`);
    const role = interaction.options.getRole("role");
    const amount = interaction.options.getInteger("amount");
    if (!role)
      return interaction.reply({ content: l.warn2 });
    if (!amount)
      return interaction.reply({ content: l.warn3 });

    await db.set(`thank_role_${amount}`, role.id);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(l.success)
          .setDescription(
            (l.success_desc).replace("%num", amount).replace("%role", role)
          )
          .setColor(Colors.Green),
      ],
    });
  },
};
