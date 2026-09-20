import hljs from "highlight.js/lib/core";
import { aboutMeText } from "@/data/aboutMe";
import typescript from "highlight.js/lib/languages/typescript";
import aboutMePlaceholders from "@/data/aboutMePlaceholders.json";

hljs.registerLanguage("typescript", typescript);

export function getCodeBlock() {
	let replacedAboutMeText = aboutMeText;

	replacedAboutMeText = replaceAboutMePlaceholders(replacedAboutMeText, true)

	let highlightedAboutMe = hljs.highlight(replacedAboutMeText, {
		language: "typescript",
		ignoreIllegals: true,
	}).value;

	highlightedAboutMe = replaceAboutMePlaceholders(highlightedAboutMe, false)

	return highlightedAboutMe;
}

export function replaceAboutMePlaceholders(text: string, js: boolean): string {
	let replacedText = text;

	for (const placeholder in aboutMePlaceholders) {
		let hasJs = false;

		let replace =
			aboutMePlaceholders[placeholder as keyof typeof aboutMePlaceholders];

		if (replace.startsWith("__execjs:")) hasJs = true;

		if ((js && !hasJs) || (!js && hasJs)) continue;

		// biome-ignore lint/security/noGlobalEval: The executed code is exclusively written by me so it's safe
		if (hasJs) replace = eval(replace.split("__execjs:").pop() as string);

		replacedText = replacedText.replaceAll(
			`[[${placeholder}]]`,
			replace,
		);
	}

	return replacedText;
}