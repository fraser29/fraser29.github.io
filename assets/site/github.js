import { siteMeta } from "./data.js";

const API_URL = `https://api.github.com/users/${siteMeta.owner}/repos?per_page=100&type=owner&sort=updated`;

export async function fetchPublicOwnedRepos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`GitHub API request failed (${response.status})`);
    const repos = await response.json();
    return repos.filter(
      (repo) => repo.owner?.login === siteMeta.owner && !repo.private && !repo.fork
    );
  } catch (error) {
    console.warn("Failed to fetch GitHub repositories", error);
    return [];
  }
}

export function toRepoMetaMap(repos) {
  return new Map(
    repos.map((repo) => [
      repo.name,
      {
        stars: repo.stargazers_count,
        language: repo.language,
        updated: repo.updated_at,
        forks: repo.forks_count,
        description: repo.description || ""
      }
    ])
  );
}
