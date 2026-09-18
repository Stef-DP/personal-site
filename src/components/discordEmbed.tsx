import type { DiscordEmbed as DiscordEmbedType } from "@/types/discordEmbed";

export function DiscordEmbed({
    embed
}: {
    embed: DiscordEmbedType;
}) {
    return (
        <script
            id="discord:component-embed"
            type="application/json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the content is not an user input or anything dangerous
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(embed),
            }}
        />
    );
}