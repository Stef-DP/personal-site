/** biome-ignore-all lint/performance/noImgElement: img is required for this to work */
import { toplanguagesExcludedRepos } from "@/data/constants";
import { aboutMePlainText } from "@/data/aboutMe";
import { getCodeBlock } from "@/functions/aboutMeCodeblock";
import type TypeItInstance from "typeit";
import { useState } from "react";

import TypeIt from "typeit-react";

export default function About() {
	const codeBlockData = getCodeBlock()
		.split("\n")
		.map((line, index) => `<pre data-prefix="${index + 1}">${line}</pre>`)
		.join("\n");

	const [typeItInstance, setTypeItInstance] = useState<TypeItInstance | null>(
		null,
	);
	const [skippedAnimation, setSkippedAnimation] = useState(false);

	const [plainText, setPlainText] = useState(false);

	return (
		<div className="flex justify-center items-center min-h-screen px-4">
			<div className="bg-base-100 shadow-xl rounded-box p-6 max-w-6xl w-full mt-17 mb-6 sm:mt-0 md:mt-10 lg:mt-17 2xl:my-auto">
				<h1 className="my-4 font-bold sm:mx-4 flex justify-between text-2xl items-center mb-10">
					<span>About</span>

					<div>
						<button
							type="button"
							className="btn btn-soft btn-accent mr-3"
							onClick={() => {
								if (plainText) {
									setPlainText(false);
									
									if (
										typeItInstance &&
										["destroyed", "completed", "frozen"].every(
											(state) => !typeItInstance.is(state),
										)
									) {
										typeItInstance.options({
											cursor: false
										}).freeze();
									}
								} else {
									setPlainText(true);
									
									if (
										typeItInstance &&
										["destroyed", "completed"].every(
											(state) => !typeItInstance.is(state),
										)
									) {
										typeItInstance.options({
											cursor: false
										}).unfreeze();
									}
								}
							}}
						>
							Switch to {plainText ? "Code" : "Plain Text"}
						</button>

						{!plainText && (
							<button
								type="button"
								disabled={skippedAnimation}
								className={`btn btn-soft btn-accent mr-3 ${skippedAnimation ? "cursor-not-allowed opacity-50" : ""}`}
								onClick={() => {
									if (
										typeItInstance &&
										["destroyed", "completed", "frozen"].every(
											(state) => !typeItInstance.is(state),
										)
									) {
										typeItInstance.options({
											cursor: false
										}).freeze();
										setSkippedAnimation(true);
									}
								}}
							>
								Skip Animation
							</button>
						)}

						<button 
							type="button"
							className="btn btn-soft btn-accent"
							onClick={() => {
								const url = new URL(window.location.href);

								url.searchParams.set("page", "home");

								window.history.replaceState(null, "", url);
							}}
						>
							<span className="icon-[tabler--arrow-back] size-5" /> Back
						</button>
					</div>
				</h1>
				{plainText ? (
					<div
						className="
							p-4 max-h-[250px] 2xl:max-h-[300px] bg-base-200 overflow-auto rounded-md
							[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1:first-child]:mt-0
							[&_ul]:list-disc [&_ul]:list-inside
							[&_ul_ul]:ml-6
							[&_li]:my-1
							[&_p]:inline [&_p]:font-bold
							[&_s]:line-through [&_s]:text-neutral-500
							[&_a]:text-primary [&_a]:underline hover:[&_a]:text-primary-focus
						"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: required as aboutMePlainText contains HTML elements
						dangerouslySetInnerHTML={{ __html: aboutMePlainText }}
					/>
				) : (
					<div className="text-base-content mockup-code bg-base-200 p-4 max-h-[250px] 2xl:max-h-[300px] overflow-auto rounded-md">
						{skippedAnimation ? (
							// biome-ignore lint/security/noDangerouslySetInnerHtml: required as codeBlockData contains HTML elements rendered by highlightjs
							<span dangerouslySetInnerHTML={{ __html: codeBlockData }} />
						) : (
							<TypeIt
								getBeforeInit={(instance) => {
									setTypeItInstance(instance);

									instance
										.options({
											speed: 1,
											afterComplete: () => {
												instance.options({
													cursor: false
												}).freeze();
												setSkippedAnimation(true);
											},
										})
										.type(codeBlockData)
										.go();

									return instance;
								}}
							/>
						)}
					</div>
				)}

				<h2 className="my-6 ml-2 text-2xl">My GitHub Stats:</h2>

				<div className="flex flex-wrap my-4 justify-center">
					<img
						src="https://github-readme-streak-stats-one-blue.vercel.app/?user=Stef-DP&theme=catppuccin-mocha&card_height=275"
						className="w-full sm:w-1/3 p-1"
						alt="GitHub Streaks"
					/>
					<img
						src={`https://github-readme-stats-silk-eight.vercel.app/api/top-langs/?username=Stef-DP&theme=catppuccin_mocha&layout=compact&langs_count=6&exclude_repo=${toplanguagesExcludedRepos.join(",")}`}
						className="w-full sm:w-1/3 p-1"
						alt="GitHub Top languages"
					/>
					<img
						src="https://github-readme-stats-silk-eight.vercel.app/api?username=Stef-DP&show_icons=true&theme=catppuccin_mocha&line_height=36"
						className="w-full sm:w-1/3 p-1"
						alt="General GitHub Stats"
					/>
				</div>
			</div>
		</div>
	);
}
