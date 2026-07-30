import type {
	APILicense,
	APIRepo,
	FormattedLinkHeader,
	FormattedRepo,
	ScoredFormattedRepo,
} from "@/types/github";

import axios, {
	type AxiosRequestConfig,
	type AxiosResponse,
	type AxiosError,
} from "axios";

// biome-ignore lint/style/useNodejsImportProtocol: node: protocol can not be used in react
import { promisify } from "util";

const sleep = promisify(setTimeout);
const githubRepoCount =
	Number.parseInt(process.env.GITHUB_REPO_COUNT as string) || 10;

function parseLinkHeader(linkHeader: string): FormattedLinkHeader {
	const links: FormattedLinkHeader = {};

	const parts = linkHeader.split(",");

	for (const part of parts) {
		const match = part.trim().match(/<(?<link>[^>]+)>;\s*rel="(?<rel>[^"]+)"/);

		if (match) {
			const { link, rel } = match.groups || {};

			links[rel as "first" | "prev" | "next" | "last"] = link;
		}
	}

	return links;
}

async function ratelimitFetch(
	url: string,
	config?: AxiosRequestConfig | undefined,
): Promise<AxiosResponse> {
	try {
		const res = await axios.get(url, config);

		return res;
	} catch (e) {
		const error = e as AxiosError;

		if (error?.response?.status === 429 || error?.response?.status === 403) {
			const ratelimitResetHeader = error.response.headers["x-ratelimit-reset"];
			const retryAfterHeader = error.response.headers["retry-after"];

			const retryAfter =
				(Number.parseInt(retryAfterHeader) ||
					(Number.parseInt(ratelimitResetHeader) * 1000 - Date.now()) / 1000 ||
					60) * 1000;

			console.log(
				`Rate limit hit, retrying in ${retryAfter / 1000 / 60} minutes...`,
			);

			if (retryAfter) {
				await sleep(retryAfter);
				console.log("Retrying...");

				return await ratelimitFetch(url, config);
			}
		} else {
			throw e;
		}
	}

	return {} as AxiosResponse;
}

async function fetchRepos(
	next?: string,
	skipLoop = false,
): Promise<{
	next?: string;
	repos: APIRepo[];
}> {
	const url =
		next || "https://api.github.com/users/Stef-DP/repos?per_page=100";

	let repos: APIRepo[] = [];

	try {
		const res = await ratelimitFetch(url, {
			headers: process.env.GITHUB_API_PAT
				? {
						Authorization: `Bearer ${process.env.GITHUB_API_PAT}`,
						"X-GitHub-Api-Version": "2022-11-28",
					}
				: undefined,
		});

		const data = res.data as APIRepo[];

		const linkHeader = res.headers.link;

		let next = linkHeader ? parseLinkHeader(linkHeader).next : undefined;

		repos = [...repos, ...data];

		if (skipLoop) return { next, repos };

		while (next) {
			const newRepos = await fetchRepos(next, true);

			repos = [...repos, ...newRepos.repos];

			next = newRepos.next;
		}
	} catch (e) {
		console.error(e);

		return {
			repos: [],
		};
	}

	return {
		repos,
	};
}

function rankRepositories(
	repos: Array<FormattedRepo>,
): Array<ScoredFormattedRepo> {
	const reposWithScores = repos.map((repo) => ({
		...repo,
		score: calculateScore(repo),
	}));

	return reposWithScores.sort((a, b) => b.score - a.score);
}

function calculateScore(repo: FormattedRepo): number {
	const stars = repo.stars || 0;
	const forks = repo.forks || 0;
	const watchers = repo.watchers || 0;
	const openIssues = repo.openIssues || 0;

	return stars * 2 + forks * 1.5 + watchers * 1 - openIssues * 0.5;
}

export async function getRankedRepos(
	count = githubRepoCount,
): Promise<Array<ScoredFormattedRepo>> {
	const data = await fetchRepos();

	const repos: Array<FormattedRepo> = data.repos
		.filter((repo) => !repo.archived && !repo.fork)
		.map((repo) => {
			return {
				id: repo.id,
				stars: repo.stargazers_count || 0,
				forks: repo.forks_count || 0,
				watchers: repo.watchers_count || 0,
				openIssues: repo.open_issues_count || 0,
				fullName: repo.full_name,
				url: repo.html_url,
				homepage: repo.homepage || null,
				description: repo.description,
				license: {
					key: repo.license?.key || null,
					name: repo.license?.name || null,
					url: repo.license?.url || null,
				},
			};
		});

	const topRepos = rankRepositories(repos).slice(0, count);

	for (const repo of topRepos) {
		if (repo.license?.key) {
			const res = await ratelimitFetch(
				`https://api.github.com/licenses/${repo.license.key}`,
				{
					headers: process.env.GITHUB_API_PAT
						? {
								Authorization: `Bearer ${process.env.GITHUB_API_PAT}`,
								"X-GitHub-Api-Version": "2022-11-28",
							}
						: undefined,
				},
			);

			const data = res.data as APILicense;

			repo.license.url = data.html_url;
		}
	}

	return topRepos;
}
