import { SlashCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";

import moment from "moment";
import { Database } from "ydb";
import { locale } from "../utils/locale";

let langData = new Database("translation.yml");
export default {
  data: new SlashCommandBuilder()
    .setName("thank")
    .setNameLocalizations({
      "en-US": langData.get("English").thank.name,
      ja: langData.get("Nihongo").thank.name,
    })
    .setDescription("Thank a given user (can only be used once a day)")
    .setDescriptionLocalizations({
      "en-US": langData.get("English").thank.description,
      ja: langData.get("Nihongo").thank.description,
    })
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to thank")
        .setDescriptionLocalizations({
          "en-US": langData.get("English").thank.role_description_1,
          ja: langData.get("Nihongo").thank.role_description_1,
        })
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    let l = langData.get(locale(interaction)).thank;

    await interaction.deferReply();
    if (interaction.user.bot) return;
    if (interaction.options.getUser("user").bot)
      return interaction.editReply({ content: l.warn1 });
    if (interaction.user.id === interaction.options.getUser("user").id)
      return interaction.editReply({ content: l.warn2 });
    const db = new Database(`data/${interaction.guild.id}.json`);
    const user = interaction.options.getUser("user");
    let member = interaction.guild.members.cache.get(user.id);
    if (!user) return interaction.editReply({ content: l.warn3 });

    const thankerCooldown = db.get(`cooldown.${interaction.user.id}`);
    if (thankerCooldown && Date.now() < thankerCooldown)
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle(l.cooldown)
            .setDescription(
              `${l.cooldown_description} ${
                moment.duration(thankerCooldown - Date.now()).hours() +
                ` ${l.hour}, ` +
                moment.duration(thankerCooldown - Date.now()).minutes() +
                ` ${l.min}, ` +
                moment.duration(thankerCooldown - Date.now()).seconds() +
                ` ${l.sec}!`
              }`
            )
            .setColor(Colors.Red),
        ],
      });
    let serverCooldown = 86400000;
    if (db.has("server-cooldown")) serverCooldown = db.get("server-cooldown");
    await db.set(
      `cooldown.${interaction.user.id}`,
      Date.now() + serverCooldown
    );
    await db.add(`thanks.${user.id}`, 1);

    db.all().forEach(async (key: any) => {
      if (key.ID.startsWith("thank_role_")) {
        const level = key.ID.split("_")[2];
        const role = interaction.guild.roles.cache.get(db.get(key.ID));
        if (db.get(`thanks.${user.id}`) >= level) {
          if (role.editable === false) {
            await interaction.editReply({
              embeds: [
                new EmbedBuilder()
                  .setTitle(l.success)
                  .setDescription(
                    l.success_desc
                      .replace("%user", user)
                      .replace("%num", db.get(`thanks.${user.id}`))
                  )
                  .setColor(Colors.Green),
              ],
            });
            return await interaction.followUp({
              embeds: [
                new EmbedBuilder()
                  .setTitle(l.error)
                  .setDescription(
                    l.error_desc.replace("%role", role).replace("%user", user)
                  )
                  .setColor(Colors.Red),
              ],
            });
          }
          await member.roles.add(role);
          await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle(l.success)
                .setDescription(
                  l.success_desc
                    .replace("%user", user)
                    .replace("%num", db.get(`thanks.${user.id}`))
                )
                .setColor(Colors.Green),
            ],
          });
        }
      } else {
        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle(l.success)
              .setDescription(
                l.success_desc
                  .replace("%user", user)
                  .replace("%num", db.get(`thanks.${user.id}`))
              )
              .setColor(Colors.Green),
          ],
        });
      }
    });
  },
};
