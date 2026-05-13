const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "kunalpawar8788";

const toTitleCase = (value) =>
  value
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const buildProjectImageUrl = (repo) => {
  const keywords = [repo.name, repo.language, ...(repo.topics || [])]
    .filter(Boolean)
    .map((item) => String(item).toLowerCase().replace(/[-_]/g, " "));

  const query = encodeURIComponent(keywords.join(", "));
  const seed = repo.id || repo.name.length;

  return `https://source.unsplash.com/1600x900/?${query}&sig=${seed}`;
};

const mapGithubRepoToProject = (repo) => {
  const techStack = Array.from(new Set([repo.language, ...(repo.topics || [])].filter(Boolean))).slice(0, 5);
  const homepage = typeof repo.homepage === "string" ? repo.homepage.trim() : "";
  const liveUrl = homepage || (repo.has_pages ? `https://${GITHUB_USERNAME}.github.io/${repo.name}` : "");

  return {
    _id: repo.id,
    title: toTitleCase(repo.name),
    description: repo.description || `Source code for ${toTitleCase(repo.name)} from my GitHub profile.`,
    image: buildProjectImageUrl(repo),
    techStack,
    liveUrl,
    githubUrl: repo.html_url,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    updatedAt: repo.updated_at,
    repoName: repo.name,
  };
};

const fetchGithubProjects = async () => {
  const projects = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to fetch projects from GitHub.");
    }

    const repos = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      break;
    }

    projects.push(...repos.filter((repo) => !repo.fork));
    page += 1;
  }

  return projects
    .sort((first, second) => {
      const firstScore = first.stargazers_count + first.forks_count;
      const secondScore = second.stargazers_count + second.forks_count;
      return secondScore - firstScore;
    })
    .map(mapGithubRepoToProject);
};

export const fetchProjects = async () => {
  try {
    return await fetchGithubProjects();
  } catch (githubError) {
    const response = await fetch(`${API_BASE}/projects`);
    if (!response.ok) {
      throw new Error("Unable to fetch projects.");
    }

    const result = await response.json();
    return result.data || [];
  }
};

export const submitContact = async (payload) => {
  const response = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to submit contact form.");
  }

  return result;
};
