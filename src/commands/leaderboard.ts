import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";

import { Database } from "ydb";
import { locale } from "../utils/locale";
import { log } from "console";

let langData = new Database("translation.yml");
export default {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setNameLocalizations({
      "en-US": langData.get("English").leaderboard.name,
      ja: langData.get("Nihongo").leaderboard.name,
      tr: langData.get("Turkish").leaderboard.name,
    })
    .setDescription("Check the top x users in the server")
    .setDescriptionLocalizations({
      "en-US": langData.get("English").leaderboard.description,
      ja: langData.get("Nihongo").leaderboard.description,
      tr: langData.get("Turkish").leaderboard.description,
    })
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("The amount of people you want to show")
        .setRequired(false)
        .setMinValue(0)
        .setMaxValue(100)
        .setDescriptionLocalizations({
          "en-US": langData.get("English").leaderboard.option,
          tr: langData.get("Turkish").leaderboard.option,
          ja: langData.get("Nihongo").leaderboard.option,
        })
    ),
  run: async (client, interaction) => {
    let l = langData.get(locale(interaction)).leaderboard;
    let db = new Database(`data/${interaction.guild.id}.json`);
    let number = interaction.options.getInteger("number") || 10;
    let users = db.all().filter((key) => key.ID.startsWith("thanks."));
    let sorted = users.sort((a, b) => b.data - a.data);
    let top = sorted.slice(0, number);
    let topUsers = await Promise.all(
      top.map(async (key) => {
        let user = await client.users.fetch(key.ID.split(".")[1]);
        return `${user.username} - ${key.data}`;
      })
    );

    let ranking = topUsers.map((user, index) => `${index + 1}. ${user}`);
    let embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setTitle(l.title)
      .setDescription(ranking.join("\n") || "none");
    await interaction.reply({ embeds: [embed] });
  },
};
