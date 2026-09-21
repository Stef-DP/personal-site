import Main from "@/views/main";
import type { SupportedDiscordComponents } from "@/types/discordEmbed";
import { buildDiscordActionRow, buildDiscordButton, buildDiscordEmbed, buildDiscordMediaGallery, buildDiscordMediaGalleryItem, buildDiscordSection, buildDiscordSeparator, buildDiscordTextDisplay, buildDiscordThumbnail } from "@/functions/buildDiscordEmbed";
import { getEmbedAboutText, homeEmbedText } from "@/data/discordEmbed";
import { baseUrl, rabbitImagesCount, rabbitImagesPathPrefix } from "@/data/constants";
import { DiscordEmbed } from "@/components/discordEmbed";
import { pages, type PageType } from "@/data/pages";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

	const urlSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => {
				urlSearchParams.append(key, v)
			});
        } else if (value) {
            urlSearchParams.append(key, value);
        }
    });

    const pageUrl = `${baseUrl}${urlSearchParams.size > 0 ? `?${urlSearchParams}` : ""}`;

    const pageQuery: PageType = typeof params.page === "string"
        ? params.page as PageType
        : "home";

	const page = pages.includes(pageQuery)
		? pageQuery
		: "home";

	let mainEmbedComponent: SupportedDiscordComponents = buildDiscordTextDisplay(homeEmbedText)

	if (page === "about") {
		const plainEmbedQuery = typeof params.plain === "string"

		mainEmbedComponent = buildDiscordTextDisplay(getEmbedAboutText(plainEmbedQuery))
	} else if (page === "rabbit") {
		const imageCount = rabbitImagesCount > 10 ? 10 : rabbitImagesCount;

		const rabbitImages = [...Array(imageCount)].map((_, i) => {
			const index = i + 1;

			return `${baseUrl}${rabbitImagesPathPrefix}${index}.webp`
		});

		mainEmbedComponent = buildDiscordMediaGallery(
			rabbitImages.map(src => {
				return buildDiscordMediaGalleryItem(src, false)
			})
		)
	}

    const discordEmbed = buildDiscordEmbed([
		buildDiscordSection(
			[
				buildDiscordTextDisplay(`## [My own bio - Stefano Del Prete](${pageUrl})`),
				buildDiscordTextDisplay("Most if not all of my socials are listed on my website")
			],
			buildDiscordThumbnail("https://api.lanyard.rest/694986201739952229.png")
		),
		mainEmbedComponent,
		buildDiscordSeparator(),
		buildDiscordActionRow([
			buildDiscordButton(
				"About Me",
				`${baseUrl}?page=about`,
				{
					name: "id_card",
					id: "1551145098878918706"
				}
			),
			buildDiscordButton(
				"My Projects",
				`${baseUrl}?page=projects`,
				{
					name: "code",
					id: "1551144496065159271"
				}
			),
			buildDiscordButton(
				"My Rabbit",
				`${baseUrl}?page=rabbit`,
				{
					name: "rabbit",
					id: "1551151358017544222",
					animated: false
				}
			)
		])
	]);

    return (
        <>
            <DiscordEmbed embed={discordEmbed} />
            <Main />
        </>
    );
}