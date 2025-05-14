import { Message } from "discord.js";
import { getServerInfo, getTextChannel } from "../includes/helpers";

/**
 * Echos a message from a server's echo channel to its general channel.
 */
const echoFromGeneral = async (message: Message): Promise<void> => {
    const serverInfo = message.guild && getServerInfo(message.guild);
    // if (!serverInfo) throw new Error(`Server info not found for Guild #${message.guildId ?? 0}.`);
    if (!serverInfo) return;

    const missingChannelErrorMessage = `Server #${message.guildId} must have a designated general & echo channel.`;

    // if (!serverInfo.general_channel_id || !serverInfo.echo_channel_id) throw new Error(missingChannelErrorMessage);
    if (!serverInfo.general_channel_id || !serverInfo.echo_channel_id) return;

    const generalChannel = await getTextChannel(message.guild.channels, serverInfo.general_channel_id);
    const echoChannel = await getTextChannel(message.guild.channels, serverInfo.echo_channel_id);

    // if (message.channelId !== echoChannel.id) throw new Error(missingChannelErrorMessage);
    if (message.channelId !== echoChannel.id) return;

    await generalChannel.send(message.content);
}

export default echoFromGeneral;