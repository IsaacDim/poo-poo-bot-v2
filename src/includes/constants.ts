import dotenv from "dotenv";

dotenv.config();

export const {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    ADRIANNE_ID,
    MICO_ID,
    PAUL_ID,
    NEO_ID,
    ICE_ID,
    ISAAK_ID,
    TRASH_SERVER_ID,
    TRASH_SERVER_GENERAL_CHANNEL_ID,
    TRASH_SERVER_ECHO_CHANNEL_ID,
    PLAYGROUND_SERVER_ID,
    PLAYGROUND_SERVER_GENERAL_CHANNEL_ID,
} = process.env;

if (
    !DISCORD_TOKEN ||
    !DISCORD_CLIENT_ID ||
    !ADRIANNE_ID ||
    !MICO_ID ||
    !PAUL_ID ||
    !NEO_ID ||
    !ICE_ID ||
    !ISAAK_ID ||
    !TRASH_SERVER_ID ||
    !TRASH_SERVER_GENERAL_CHANNEL_ID ||
    !TRASH_SERVER_ECHO_CHANNEL_ID ||
    !PLAYGROUND_SERVER_ID ||
    !PLAYGROUND_SERVER_GENERAL_CHANNEL_ID
) {
    throw new Error("Missing environment variables");
}

export const discord_config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
}

export const USER_IDENTIFIERS = [
    "adrianne",
    "mico",
    "paul",
    "neo",
    "ice",
    "isaak",
] as const;

export type UsersInfoKey = (typeof USER_IDENTIFIERS)[number];

export type UserInfo = {
    name: string;
    id: string;
};

export const users: Record<UsersInfoKey, UserInfo> = {
    adrianne: {
        id: ADRIANNE_ID,
        name: "Adrianne",
    },
    mico: {
        id: MICO_ID,
        name: "Mico",
    },
    paul: {
        id: PAUL_ID,
        name: "Paul",
    },
    neo: {
        id: NEO_ID,
        name: "Naeomi",
    },
    ice: {
        id: ICE_ID,
        name: "Isaac",
    },
    isaak: {
        id: ISAAK_ID,
        name: "Isaak",
    },
};

export const SERVER_NAMES = [
    "trash_server",
    "playground_server",
] as const;

export type ServerInfoKey = (typeof SERVER_NAMES)[number];

export type ServerInfo = {
    server_id: string;
    general_channel_id?: string;
    echo_channel_id?: string;
    users?: Partial<Record<UsersInfoKey, UserInfo>>,
};

export const serverInfos: Record<ServerInfoKey, ServerInfo> = {
    trash_server: {
        server_id: TRASH_SERVER_ID,
        general_channel_id: TRASH_SERVER_GENERAL_CHANNEL_ID,
        echo_channel_id: TRASH_SERVER_ECHO_CHANNEL_ID,
        users: {
            adrianne: users.adrianne,
            mico: users.mico,
            paul: users.paul,
            neo: users.neo,
            ice: users.ice,
            isaak: users.isaak,
        }
    },
    playground_server: {
        server_id: PLAYGROUND_SERVER_ID,
        general_channel_id: PLAYGROUND_SERVER_GENERAL_CHANNEL_ID,
    },
};

// Test change