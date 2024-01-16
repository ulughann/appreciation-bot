import { Client, Collection } from "discord.js";
import { intents } from "./utils/intents";

import { Routes } from "discord-api-types/v10";
import { REST } from "@discordjs/rest";
import { Inform } from "./utils/console";

import { parse } from "./utils/configParser";

import { join, resolve } from "path";

import { readdirSync, readFileSync, lstatSync } from "fs";

interface ClientWithCommands extends Client {
  commands: Collection<string, any>;
  datas: any[];
}

const client = new Client(intents) as ClientWithCommands;
client.commands = new Collection();
client.datas = [];

const token = parse(readFileSync("config", "utf-8")).token;

const getFiles = (dir, files = []) => {
  readdirSync(dir).forEach((file) => {
    const filePath = join(dir, file);
    if (lstatSync(filePath).isDirectory()) {
      getFiles(filePath, files);
    } else if (filePath.endsWith(".ts")) {
      files.push(filePath);
    }
  });
  return files;
};

getFiles(resolve(__dirname, "./commands")).forEach(async (file) => {
  const command = await import(file).then((c) => c.default);
  client.datas.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
});
client.once("ready", async () => {
  const rest = new REST({ version: "10" }).setToken(client.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.datas,
    });
  } catch (error) {
    console.error(error);
  }
  Inform(`Logged in as ${client.user.tag}`);
  Inform(`Loaded ${client.commands.size} commands`);
});

readdirSync("./src/events/")
  .filter((file) => file.endsWith(".ts"))
  .forEach(async (file) => {
    const event = await import(`./events/${file}`).then((e) => e.default);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });

client.login(token);

// catch all uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(err);
});
process.on("unhandledRejection", (err) => {
  console.error(err);
});