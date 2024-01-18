import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Colors, PermissionFlagsBits } from "discord.js";

import moment from "moment";
import { Database } from "ydb";

let langData = new Database("translation.yml");
import { locale } from "../../utils/locale";

export default {
  data: new SlashCommandBuilder()
    .setName("set-cooldown")
    .setNameLocalizations({
      "en-US": langData.get("English").set_cooldown.name,
      ja: langData.get("Nihongo").set_cooldown.name,
      tr: langData.get("Turkish").set_cooldown.name,
    })
    .setDescription("Sets the cooldown for thanking someone")
    .setDescriptionLocalizations({
      "en-US": langData.get("English").set_cooldown.description,
      ja: langData.get("Nihongo").set_cooldown.description,
      tr: langData.get("Turkish").set_cooldown.description,
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption((option) =>
      option
        .setName("minutes")
        .setDescription("Minutes to set the cooldown to")
        .setRequired(false)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").set_cooldown.min,
          ja: langData.get("Nihongo").set_cooldown.min,
          tr: langData.get("Turkish").set_cooldown.min,
        })
    )
    .addIntegerOption((option) =>
      option
        .setName("hours")
        .setDescription("Hours to set the cooldown to")
        .setRequired(false)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").set_cooldown.hour,
          ja: langData.get("Nihongo").set_cooldown.hour,
          tr: langData.get("Turkish").set_cooldown.hour,
        })
    )
    .addIntegerOption((option) =>
      option
        .setName("days")
        .setDescription("Days to set the cooldown to")
        .setRequired(false)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").set_cooldown.day,
          ja: langData.get("Nihongo").set_cooldown.day,
        })
    ),
  run: async (client, interaction) => {
    let l = langData.get(locale(interaction)).set_cooldown;
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
      return interaction.reply({
        embeds: [new EmbedBuilder().setTitle(l.warn1).setColor(Colors.Red)],
      });

    let time = 0;
    if (interaction.options.getInteger("minutes"))
      time += interaction.options.getInteger("minutes") * 60000;
    if (interaction.options.getInteger("hours"))
      time += interaction.options.getInteger("hours") * 3600000;
    if (interaction.options.getInteger("days"))
      time += interaction.options.getInteger("days") * 86400000;

    if (time < 1) {
      return interaction.reply({
        embeds: [new EmbedBuilder().setTitle(l.warn2).setColor(Colors.Red)],
      });
    }

    const db = new Database(`data/${interaction.guild.id}.json`);
    await db.set("server-cooldown", time);

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(l.success)
          .setDescription(
            `${l.success_desc} ${
              moment.duration(time).days() +
              ` ${l.days}, ` +
              moment.duration(time).hours() +
              ` ${l.hours}, ` +
              moment.duration(time).minutes() +
              ` ${l.mins}, `
            }`
          )
          .setColor(Colors.Green),
      ],
    });
  },
};
