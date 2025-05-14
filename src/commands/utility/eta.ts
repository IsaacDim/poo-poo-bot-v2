import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";

const SECONDS = "seconds";
const MINUTES = "minutes";
const HOURS = "hours";
const DAYS = "days";

const eta = {
	data: new SlashCommandBuilder()
		.setName("eta")
		.setDescription("Eta when?")
        .addNumberOption(option => 
            option
                .setName("time")
                .setDescription('How long should we wait?')
                .setRequired(true)
                .setMinValue(0)
        )
        .addStringOption(option => 
            option
                .setName("unit")
                .setDescription('What time units we working with?')
                .setRequired(true)
                .setChoices(
                    { name: SECONDS, value: SECONDS },
                    { name: MINUTES, value: MINUTES },
                    { name: HOURS, value: HOURS },
                    { name: DAYS, value: DAYS },
                )
        )
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription('Who are we expecting to be here?')
                .setRequired(false)
        )
	,async execute(interaction: ChatInputCommandInteraction) {
        const sendUser = interaction.user;
        const targetUser = interaction.options.getUser("user");
        const time = Math.round(interaction.options.getNumber("time") as number * 10) / 10;
        const unit = interaction.options.getString("unit");
        const channel = interaction.channel as TextChannel;

        let milliseconds = time;

        switch (unit) {
            case DAYS:
                interaction.reply(`Aint no way this guy said his eta was ${time} ${unit}.`)
                return;
            case HOURS:
                milliseconds = milliseconds * 60;
            case MINUTES:
                milliseconds = milliseconds * 60;
            case SECONDS:
                milliseconds = milliseconds * 1000;
        }

        if (milliseconds > 43200000) {
            await interaction.reply(`Too long, we're not waiting any longer than 12 hours.`);
            return;
        }

        let userPrefix = `${sendUser}`;
        if (targetUser) userPrefix += `and ${targetUser}`;

        await interaction.reply(`${userPrefix} :index_pointing_at_the_viewer: better be back here by ${time} ${unit}.`);

        setTimeout(async () => {
            channel.send(`${userPrefix} wya :index_pointing_at_the_viewer::eye::eye:.`)
        }, milliseconds);
	},
};

export default eta;