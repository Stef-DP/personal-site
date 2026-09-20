import { personalInfoObject } from "./aboutMe";
import { socials } from "./socials";

export const homeEmbedText = `Meanwhile, here are my main socials:\n${
    socials
        .filter(social => social.displayInEmbed)
        .map(social => `[${social.name}](${social.url})`)
        .join(" • ")
}`

export const aboutEmbedText = `\`\`\`ts
${
    personalInfoObject
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