import { Guild, GuildChannelManager, TextChannel } from "discord.js";
import { ServerInfoKey, serverInfos } from "./constants";


/**
 * Returns the appropriate server info from the config from the given server.
 * Returns null if no config could be found.
 */
export const getServerInfo = (guild: Guild) => {
    // Iterate over all infos and return matching info
    for (const serverInfoKey in serverInfos) {
        const serverInfo = serverInfos[serverInfoKey as ServerInfoKey];
        if (serverInfo.server_id === guild.id) return serverInfo;
    }

    // If no info found return null
    return null;
};

/**
 * Attempts to return the TextChannel object.
 */
export const getTextChannel = async (channelManager: GuildChannelManager, channelId: string): Promise<TextChannel> => {
    const channel = await channelManager.fetch(channelId);
    if (channel instanceof TextChannel) return channel;
    throw new Error("The given Channel is not a TextChannel.");
};