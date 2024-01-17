import { readdirSync, lstatSync } from "fs";
import { resolve, join } from "path";

let commandFiles = [];
let directories = [resolve(__dirname, "../commands")];

while (directories.length > 0) {
  const directory = directories.pop();
  readdirSync(directory).forEach((file) => {
    const filePath = join(directory, file);
    if (lstatSync(filePath).isDirectory()) {
      directories.push(filePath);
    } else if (filePath.endsWith('.ts')) {
      commandFiles.push(filePath);
    }
  });
}

export default {
  name: "interactionCreate",
  execute: async (interaction) => {
    let client = interaction.client;
    if (interaction.user.bot) return;

    for (const file of commandFiles) {
      const command = await import(file).then(c => c.default)
      if (
        interaction.commandName.toLowerCase() ===
        command.data.name.toLowerCase()
      ) {
        command.run(client, interaction);
      }
    }
  },
};