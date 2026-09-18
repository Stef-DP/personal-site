"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useLanyard } from "react-use-lanyard";
import useHash from "@/hooks/useHash";
import axios from "axios";

import { useSearchParams, useRouter } from "next/navigation";
import { onekoVariants } from "@/data/oneko";

import Projects from "@/views/projects";
import Rabbit from "@/views/rabbit";
import About from "@/views/about";
import Home from "@/views/home";

import Select, { type SelectOption } from "@/components/select";
import Loading from "@/components/loading";
import Script from "next/script";

import type { ScoredFormattedRepo } from "@/types/github";
import type { Project } from "@/types/projects";
import { buildDiscordActionRow, buildDiscordButton, buildDiscordEmbed, buildDiscordSection, buildDiscordSeparator, buildDiscordTextDisplay, buildDiscordThumbnail } from "@/functions/buildDiscordEmbed";
import { baseUrl } from "@/data/constants";
import { DiscordEmbed } from "@/components/discordEmbed";

type Page = "rabbit" | "home" | "projects" | "about";

const pages: Page[] = ["rabbit", "home", "projects", "about"];

export default function Main() {
	const router = useRouter();
	const searchParams = useSearchParams();

	let currentVariant = searchParams.get("neko") || "maia";
	const [onekoVariantCredits, setOnekoVariantCredits] = useState<ReactNode>(onekoVariants.find(variant => variant.name === currentVariant)?.credits);

	if (!onekoVariants.map(oneko => oneko.name).includes(currentVariant)) currentVariant = "maia";

	const onekoOptions: SelectOption[] = onekoVariants.map((variant) => ({
		value: variant.name,
		label: variant.name.charAt(0).toUpperCase() + variant.name.slice(1),
		icon: `/images/oneko/heads/${variant.name}.png`,
		default: variant.name === (currentVariant || "maia"),
		tooltip: variant.credits,
		lazy: true,
	}));

	const { loading, status } = useLanyard({
		userId: "694986201739952229",
		socket: true,
	});

	const hash = useHash();

	const [page, setPage] = useState<Page>("home");

	const [topRepos, setTopRepos] = useState<Project[]>([]);

	const discordEmbed = buildDiscordEmbed([
			buildDiscordSection(
				[
					buildDiscordTextDisplay(`## [My own bio :) - Stefano Del Prete | Home Page](${baseUrl})`),
					buildDiscordTextDisplay("Most if not all of my socials are listed here :)")
				],
				buildDiscordThumbnail("https://api.lanyard.rest/694986201739952229.png")
			),
			buildDiscordSeparator(),
			buildDiscordActionRow([
				buildDiscordButton(
					"About Me",
					`${baseUrl}/#about`,
					"👤"
				),
				buildDiscordButton(
					"My Projects",
					`${baseUrl}/#projects`,
					"🛠️"
				),
				buildDiscordButton(
					"My Rabbit",
					`${baseUrl}/#rabbit`,
					"🐰"
				)
			])
		])

	useEffect(() => {
		setPage((prevPage) =>
			pages.includes(hash as Page)
				? (hash as Page) || prevPage
				: hash === ""
					? "home"
					: prevPage,
		);
	}, [hash]);

	const [hideLoading, setHideLoading] = useState<boolean>(false);
	const [showHideLoadingButton, setShowHideLoadingButton] =
		useState<boolean>(false);

	useEffect(() => {
		async function fetchTopRepos() {
			const res = await axios.get("/api/topRepos");
			const data = res.data as Array<ScoredFormattedRepo>;

			const projectRepos: Project[] = data.map((repo) => ({
				name: repo.fullName,
				source: `https://github.com/${repo.fullName}`,
				description: repo.description,
				url: repo.homepage,
				git: repo,
				slug: "repo",
				license: repo.license,
			}));

			setTopRepos(projectRepos);
		}

		fetchTopRepos();
	}, []);

	useEffect(() => {
		if (!loading && status) return setShowHideLoadingButton(true);

		/* 
			not sure if to keep this kind of loading, since if the user gets ratelimited by github,
			(60 reqs per hour, per user) they can't access the projects page anymore for 1 hour
			(the site does around 6 requests per refresh)

			- 1 request every 100 repos
			- 5 requests (1 for each of the 5 top repos to get their licenses)
		*/

		// if (page === "home" && !loading && status) return setShowHideLoadingButton(true);
		// if (page === "projects" && topRepos.length > 0) return setShowHideLoadingButton(true);

		// setHideLoading(true)
	}, [loading, status /*, page, topRepos*/]);

	function handleHideLoading() {
		setHideLoading(true);
	}

	return (
		<>
			<DiscordEmbed embed={discordEmbed} />

			{page === "home" && <div className="bgeffect" />}

			<Select
				options={onekoOptions}
				query="neko"
				className="inline-block absolute mt-2 ml-2"
				placeholder="Cat Variant"
				onChange={(selectedOption) => {
					router.replace(`?neko=${selectedOption.value}#${hash || "home"}`);

					const event = new CustomEvent('onekoVariantChanged', {
						detail: { variant: selectedOption.value }
					});

					const variant = onekoVariants.find(variant => variant.name === selectedOption.value);
					if (variant) setOnekoVariantCredits(variant.credits);

					window.dispatchEvent(event);
				}}
			/>

			<Loading
				showSkipButton={showHideLoadingButton}
				hideLoading={handleHideLoading}
				hide={hideLoading}
			/>

			{page === "home" && <Home onekoVariantCredits={onekoVariantCredits} loading={loading} status={status} />}

			{page === "projects" && <Projects topRepos={topRepos} />}

			{page === "about" && <About />}

			{page === "rabbit" && <Rabbit />}

			<Script src="/js/oneko.js" />
		</>
	);
}
