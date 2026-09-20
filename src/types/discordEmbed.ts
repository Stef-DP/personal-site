export interface DiscordEmbed {
    component: DiscordContainer
}

export type SupportedDiscordComponents = DiscordTextDisplay | DiscordSection | DiscordSeparator | DiscordActionRow | DiscordMediaGallery

export interface DiscordContainer {
    type: 17;
    accent_color: number;
    components: SupportedDiscordComponents[];
}

export interface DiscordTextDisplay {
    type: 10;
    content: string;
}

export interface DiscordSection {
    type: 9;
    components: DiscordTextDisplay[];
    accessory: DiscordButton | DiscordThumbnail;
}

export interface DiscordSeparator {
    type: 14;
    spacing: 1 | 2;
    divider: boolean;
}

export interface DiscordActionRow {
    type: 1;
    components: DiscordButton[];
}

export interface DiscordButton {
    type: 2;
    label: string;
    style: 5,
    emoji: DiscordButtonEmoji | null;
    url: string;
    disabled: boolean;
}

export interface DiscordButtonEmoji {
    name: string;
    id?: string;
    animated?: boolean;
}

export interface DiscordThumbnail {
    type: 11;
    media: DiscordUnfurledMedia;
    description: string | null;
    spoiler: boolean;
}

export interface DiscordUnfurledMedia {
    url: string;
}

export interface DiscordMediaGallery {
    type: 12;
    items: DiscordMediaGalleryItem[];
}

export interface DiscordMediaGalleryItem {
    media: DiscordUnfurledMedia;
    spoiler: boolean;
}