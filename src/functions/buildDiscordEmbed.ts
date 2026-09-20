import type {
    DiscordActionRow,
    DiscordButton,
    DiscordButtonEmoji,
    DiscordEmbed,
    DiscordSection,
    DiscordSeparator,
    DiscordTextDisplay,
    DiscordThumbnail
} from "@/types/discordEmbed"

export function buildDiscordEmbed(
    components: (DiscordTextDisplay | DiscordSection | DiscordSeparator | DiscordActionRow)[] = []
): DiscordEmbed {
    return {
        component: {
            type: 17,
            accent_color: 5115028,
            components: components
        }
    }
}

export function buildDiscordTextDisplay(text: string): DiscordTextDisplay {
    return {
        type: 10,
        content: text
    }
}

export function buildDiscordSection(
    components: DiscordTextDisplay[] = [],
    accessory: DiscordButton | DiscordThumbnail
): DiscordSection {
    return {
        type: 9,
        components: components,
        accessory: accessory
    }
}

export function buildDiscordSeparator(
    spacing: "small" | "large" = "small",
    dividerVisible: boolean = true
): DiscordSeparator {
    return {
        type: 14,
        spacing: spacing === "small" ? 1 : 2,
        divider: dividerVisible
    }
}

export function buildDiscordActionRow(
    components: DiscordButton[] = []
): DiscordActionRow {
    return {
        type: 1,
        components: components
    }
}

export function buildDiscordButton(
    label: string,
    url: string,
    emoji?: DiscordButtonEmoji,
    disabled: boolean = false
): DiscordButton {
    return {
        type: 2,
        label: label,
        style: 5,
        emoji: emoji || null,
        url: url,
        disabled: disabled
    }
}

export function buildDiscordThumbnail(
    url: string,
    description?: string,
    spoiler: boolean = false
): DiscordThumbnail {
    return {
        type: 11,
        media: {
            url: url
        },
        description: description || null,
        spoiler: spoiler
    }
}