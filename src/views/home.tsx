"use client";

import { type ReactNode, useEffect, useState } from "react";
import { discordActivityTypes } from "@/data/constants";
import type { LanyardData } from "react-use-lanyard";
import { socials } from "@/data/socials";

import { Tooltip } from "react-tooltip";
import Image from "next/image";
import Link from "next/link";
import Select, { type SelectOption } from "@/components/select";
import type { Webring } from "@/types/webrings";
import { webrings } from "@/data/webrings";
import { useSearchParams } from "next/navigation";

const spotifyDefaultMessage = "Not listening to anything";
const vscodeDefaultMessage = "Not coding anything";
const playingDefaultMessage = "Not playing anything";

const formatter = new Intl.ListFormat();

interface Props {
	loading: boolean;
	status: LanyardData | undefined;
	onekoVariantCredits: ReactNode;
}

export default function Home({ loading, status, onekoVariantCredits }: Props) {
	const [customStatus, setCustomStatus] = useState<string | null>("");

	const [avatar, setAvatar] = useState<string | null>(null);
	const [avatarDecoration, setAvatarDecoration] = useState<string | null>(null);

	const [discordStatus, setDiscordStatus] = useState<
		"online" | "idle" | "dnd" | "offline"
	>("offline");

	const [spotifyArtist, setSpotifyArtist] = useState<string | null>(null);
	const [spotifySong, setSpotifySong] = useState<string | null>(null);
	const [spotifyTrackId, setSpotifyTrackId] = useState<string | null>(null);

	const [vscodeStatus, setVscodeStatus] =
		useState<string>(vscodeDefaultMessage);

	const [playingStatus, setPlayingStatus] = useState<string>(
		playingDefaultMessage,
	);

	const searchParams = useSearchParams()

	const [selectedWebring, setSelectedWebring] = useState<Webring>(
		webrings.find((webring) => webring.default) || 
		webrings[0]
	);

	useEffect(() => {
    const webringParam = searchParams.get("webring");

    if (webringParam) {
        const matchedWebring = webrings.find((webring) => webring.id === webringParam);

        if (matchedWebring) {
            setSelectedWebring(matchedWebring);
        }
    }
}, [searchParams]);

	const statuses = {
		online: "status-success",
		idle: "status-warning",
		dnd: "status-error",
		offline: "status-base-content/70",
	};

	useEffect(() => {
		if (loading) return;

		const discordActivites = status?.activities;
		const discordUser = status?.discord_user;
		const discordStatus = status?.discord_status || "offline";
		const spotifyData = status?.spotify;

		setDiscordStatus(discordStatus);

		const avatar = `https://cdn.discordapp.com/avatars/${discordUser?.id}/${discordUser?.avatar}.${discordUser?.avatar.startsWith("a_") ? "gif" : "png"}`;
		const avatarDecoration = discordUser?.avatar_decoration_data
			? `https://cdn.discordapp.com/avatar-decoration-presets/${discordUser.avatar_decoration_data.asset}.png`
			: null;

		setAvatarDecoration(avatarDecoration);
		setAvatar(avatar);

		const artist = spotifyData?.artist;
		// const album = spotifyData?.album;
		const song = spotifyData?.song;
		const trackId = spotifyData?.track_id;

		// const spotifyMessage =
		// 	artist && album && song
		// 		? `Listening to ${song} by ${formatter.format(artist.split(";"))}`
		// 		: spotifyDefaultMessage;

		if (artist && song) {
			setSpotifySong(song);
			setSpotifyArtist(formatter.format(artist.split(";")));
			setSpotifyTrackId(trackId || null);
		}

		const customStatusData = discordActivites?.find(
			(activity) => activity.id === "custom",
		);

		setCustomStatus(customStatusData?.state || null);

		const vscodeData = discordActivites?.find((activity) =>
			["Visual Studio Code", "Code"].includes(activity.name),
		);

		const workspaceRegex = /In (?<workspace>.*) - \d+ problems found/gi;
		const fileRegex = /Working on (?<file>.*):\d+:\d+/gi;

		const workspace = workspaceRegex.exec(vscodeData?.details || "")?.groups
			?.workspace;
		const file = fileRegex.exec(vscodeData?.state || "")?.groups?.file;

		const vscodeMessage =
			vscodeData && workspace && file
				? `Editing ${file} in ${workspace}`
				: vscodeDefaultMessage;

		setVscodeStatus(vscodeMessage);

		const playingData =
			discordActivites?.filter(
				(activity) =>
					activity.type === discordActivityTypes.playing &&
					!["Visual Studio Code", "Code", "IntelliJ IDEA Ultimate"].includes(
						activity.name,
					),
			) ?? [];

		const playingMessage =
			playingData.length > 0
				? `Playing ${formatter.format(playingData.map((activity) => activity.name))}`
				: playingDefaultMessage;

		setPlayingStatus(playingMessage);
	}, [status, loading]);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center p-4">
			<div className="flex flex-col items-center">
				<div className="relative">
					{avatar && (
						<Image
							priority
							src={avatar}
							alt="my profile picture"
							className="rounded-full mb-4 object-cover"
							width={96}
							height={96}
						/>
					)}

					{avatarDecoration && (
						<Image
							priority
							unoptimized
							src={avatarDecoration}
							alt="my profile picture decoration"
							className="absolute inset-0 scale-120 object-cover"
							width={96}
							height={96}
						/>
					)}
				</div>

				<div className="flex items-center">
					<h1 className="text-5xl text-primary mb-4 me-2">Stef</h1>
					<span className={`${statuses[discordStatus]} status size-4 mb-3`} />
				</div>

				<div className="flex flex-wrap my-4 gap-2 justify-center">
					{socials.map((social) => (
						<div key={social.id}>
							<Tooltip
								id={social.type === "mail" ? social.url : social.id}
								offset={28}
								className={`${social.tooltipColor} rounded-4xl! font-bold`}
								classNameArrow={social.tooltipColor}
							>
								{social.name}: {social.username}
							</Tooltip>

							<Link
								href={
									social.type === "mail" ? social.url : `/socials/${social.id}`
								}
								data-tooltip-id={
									social.type === "mail" ? social.url : social.id
								}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`My ${social.name} profile`}
							>
								<span
									className={`${social.icon} size-8 transition-transform duration-300 ease-in-out hover:scale-125 ${social.color}`}
								/>
							</Link>
						</div>
					))}
				</div>

				<div className="flex gap-2 font-mono text-accent mb-6">
					<Link
						className="btn btn-soft btn-accent"
						href="#about"
						onClick={(event) => {
							window.location.hash = event.currentTarget.hash;
						}}
					>
						&#47;about
					</Link>

					<Link
						className="btn btn-soft btn-accent"
						href="#projects"
						onClick={(event) => {
							window.location.hash = event.currentTarget.hash;
						}}
					>
						&#47;projects
					</Link>

					<Link
						className="btn btn-soft btn-accent"
						href="#rabbit"
						onClick={(event) => {
							window.location.hash = event.currentTarget.hash;
						}}
					>
						&#47;rabbit
					</Link>
				</div>

				<div className="mt-10 flex flex-col gap-2">
					{customStatus && (
						<p className="flex items-center gap-2">
							<span className="icon-[tabler--bubble-text-filled] size-5 -mb-1" />{" "}
							{customStatus}
						</p>
					)}

					<p className="flex items-center gap-2">
						<span className="icon-[fa6-brands--spotify] size-5 -mb-1" />{" "}
						{spotifyArtist && spotifySong ? (
							<>
								Listening to{" "}
								{spotifyTrackId ? (
									<Link
										href={`https://open.spotify.com/track/${spotifyTrackId}`}
										className="link link-accent link-animated"
									>
										&quot;{spotifySong}&quot; by {spotifyArtist}
									</Link>
								) : (
									<>
										&quot;{spotifySong}&quot; by {spotifyArtist}
									</>
								)}
							</>
						) : (
							spotifyDefaultMessage
						)}
					</p>

					<p className="flex items-center gap-2">
						<span className="icon-[tabler--brand-vscode] size-5 -mb-1" />{" "}
						{vscodeStatus}
					</p>

					<p className="flex items-center gap-2">
						<span className="icon-[game-icons--gamepad] size-5 -mb-1" />{" "}
						{playingStatus}
					</p>
				</div>
			</div>

			<div className="fixed flex flex-col bottom-10 right-2">
				<div className="flex flex-col rounded-full bg-[#2f3346] pt-2 pb-2">
					<button
						type="button"
						className="mx-1 cursor-pointer"
						onClick={selectedWebring.onNext}
					>
						<span className="icon-[tabler--arrow-narrow-up] size-8 align-middle" />
					</button>

					<button
						type="button"
						className="mx-1 cursor-pointer pt-2"
						onClick={selectedWebring.onRand}
					>
						<span className="icon-[ion--dice] size-6" />
					</button>

					<Link href={selectedWebring.url} className="mx-1 hover:underline self-center">
						<Image
							width={25}
							height={25}
							src={selectedWebring.icon}
							alt={selectedWebring.iconAlt}
						/>
					</Link>

					<button
						type="button"
						className="mx-1 cursor-pointer pt-2"
						onClick={selectedWebring.onPrev}
					>
						<span className="icon-[tabler--arrow-narrow-down] size-8 align-middle" />
					</button>
				</div>

				<Select
					options={
						webrings.map((webring) => ({
							// label: webring.name,
							value: webring.id,
							icon: webring.icon,
							default: webring.default,
						})) as SelectOption[]
					}
					showSelected={false}
					className="mt-2"
					placeholder=""
					direction="horizontal"
					position="left"
					onChange={(option) => {
						const webring = webrings.find((webr) => webr.id === option.value);

						if (webring) {
							setSelectedWebring(webring);
						}
					}}
				/>
			</div>

			{onekoVariantCredits && (
				<div className="fixed bottom-2 text-end text-xs text-base-content/50 p-2">
					<p>Current oneko animation by </p>
					{onekoVariantCredits}
				</div>
			)}
		</div>
	);
}
