import { getPersonalInfoObject, getPersonalInfoPlain } from "./aboutMe";
import { socials } from "./socials";

export const homeEmbedText = `Meanwhile, here are my main socials:\n${
    socials
        .filter(social => social.displayInEmbed)
        .map(social => `[${social.name}](${social.url})`)
        .join(" • ")
}`

export function getEmbedAboutText(plain: boolean): string {
    if (plain) {
        return getPersonalInfoPlain(true)
    }

    return `\`\`\`ts
${
    getPersonalInfoObject(true)
        .replaceAll("[[striketrhoughStart]]", "~~")
        .replaceAll("[[striketrhoughEnd]]", "~~")
        .replaceAll("[[currentYear]]", new Date().getFullYear().toString())
        .replaceAll(
            "[[currentTimestamp]]",
            new Date(
                new Date().getFullYear(),
                2,
                15
            ).getTime().toString()
        )
}
\`\`\``
}