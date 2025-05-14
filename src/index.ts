import { IntentsBitField, Events, Client } from "discord.js";

import { discord_config } from "./includes/constants";
import { ping, eta } from "./commands";
import { echoFromGeneral } from "./generic_handlers";
import { ServerInfoKey, serverInfos } from "./includes/constants";
import remindAdrianne from "./generic_handlers/remindAdrianne";

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const COMMANDS = [
    ping,
    eta,
];

client.login(discord_config.DISCORD_TOKEN);

client.once(Events.ClientReady, async c => {
    console.log("Startup: poo-poo-bot online.");
    console.log(`Startup: Logged in as ${client.user?.tag}`);

    const commandsData = COMMANDS.map(command => command.data.toJSON());

    // Register new commands for known servers
    try {
        for (const serverInfoKey in serverInfos) {
            const serverId = serverInfos[serverInfoKey as ServerInfoKey].server_id;
            const server = client.guilds.cache.get(serverId);
    
            if (!server) {
                console.error(`Startup: Could not find Guild #${serverId}.`);
                continue;
            }
    
            // Now set the new commands
            await server.commands.set(commandsData);
            console.log(`Startup: Registered commands in Guild #${serverId}.`)
        }
    } catch (error) {
        console.error('Startup: Error registering commands:', error);
    }

    console.log("Startup: poo-poo-bot startup completed.");
});

// Generic message handlers
client.on(Events.MessageCreate, async message => {
    try {
        await echoFromGeneral(message);
        await remindAdrianne(message);
    } catch (error) {
        return;
    }
});

// Command handlers
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Listeners for each command
    const command = COMMANDS.find(command => command.data.name === interaction.commandName);
    if (command) {
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});