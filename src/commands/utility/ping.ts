import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const ping = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with pong!"),
	async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("pong!!");
	},
};

export default ping;