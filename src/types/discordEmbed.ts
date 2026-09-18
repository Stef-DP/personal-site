interface DiscordEmbed {
    components: DiscordContainer[]
}

interface DiscordContainer {
    type: 17;
    accent_color: number;
    components: (DiscordTextDisplay | DiscordSection | DiscordSeparator | DiscordActionRow)[];
}

interface DiscordTextDisplay {
    type: 10;
    content: string;
}

interface DiscordSection {
    type: 9;
    components: DiscordTextDisplay[];
    accessory: DiscordButton | DiscordThumbnail;
}

interface DiscordSeparator {
    type: 14;
    spacing: 1 | 2;
    divider: boolean;
}

interface DiscordActionRow {
    type: 1;
    components: DiscordButton[];
}

interface DiscordButton {
    type: 2;
    label: string;
    style: 5,
    emoji: DiscordButtonEmoji | null;
    url: string;
    disabled: boolean;
}

interface DiscordButtonEmoji {
    name: string;
}

interface DiscordThumbnail {
    type: 11;
    media: DiscordThumbnailMedia;
    description: string | null;
    spoiler: boolean;
}

interface DiscordThumbnailMedia {
    url: string;
}