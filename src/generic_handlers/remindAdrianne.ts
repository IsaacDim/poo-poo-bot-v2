import { Message } from "discord.js";
import { getServerInfo, getTextChannel } from "../includes/helpers";
import { users } from "../includes/constants";

/**
 * Echos a message from a server's echo channel to its general channel.
 */
const remindAdrianne = async (message: Message): Promise<void> => {
    if (message.author.id !== users.adrianne.id) return;

    if (!message.content.includes("@")) return;

    const serverInfo = message.guild && getServerInfo(message.guild);

    if (!serverInfo || !serverInfo.general_channel_id) return

    const generalChannel = await getTextChannel(message.guild.channels, serverInfo.general_channel_id);

    if (message.channelId !== generalChannel.id) return;

    setTimeout(async () => {
        message.reply(`BING BONG! It has been 5️⃣ minutes since ${users.adrianne.name} @ someone!`);
    }, 5 * 1000 * 60);

    setTimeout(async () => {
        message.reply(`BING BONG! It has been 🔟 minutes since ${users.adrianne.name} @ someone!`);
    }, 10 * 1000 * 60);
}

export default remindAdrianne;