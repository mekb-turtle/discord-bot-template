console.log("Loading...");

import { Client, GatewayIntentBits, SlashCommandBuilder, Routes, Interaction } from "discord.js";
import { REST } from "@discordjs/rest";
require("dotenv").config();
const client: Client = new Client({ intents: [ GatewayIntentBits.Guilds ] });
const commands = [
	new SlashCommandBuilder().setName("ping").setDescription("Ping!"),
].map(command => command.toJSON());
client.once("ready", async () => {
	console.log("Ready!");
	const rest = new REST({ version: "10" }).setToken(client.token);
	rest.put(Routes.applicationGuildCommands(client.user.id, "1234567890123456789"), { body: commands }).catch(console.error);
	client.on("interactionCreate", async (i: Interaction) => {
		if (i.isCommand()) {
			switch (i.commandName) {
				case "ping":
					i.reply({ content: "Pong!", ephemeral: true });
					break;
			}
		}
	});
});
client.login(process.env.TOKEN);
