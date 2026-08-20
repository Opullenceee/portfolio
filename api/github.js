export default async function handler(req, res) {

  const username = "opullenceee";

  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json"
  };

  try {

    const [userRes, reposRes, eventsRes] = await Promise.all([

      fetch(`https://api.github.com/users/${username}`, { headers }),

      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers }),

      fetch(`https://api.github.com/users/${username}/events/public?per_page=8`, { headers })

    ]);

    const user = await userRes.json();
    const repos = await reposRes.json();
    const events = await eventsRes.json();

    // Aggregate real language byte-counts across all non-fork repos.
    // GitHub's per-repo "language" field only gives ONE dominant language,
    // so we hit each repo's languages_url to get accurate proportions
    // (e.g. a repo that's 70% JS / 30% CSS counts toward both).
    const nonForkRepos = Array.isArray(repos) ? repos.filter(r => !r.fork) : [];

    const languageResults = await Promise.all(
      nonForkRepos.map(r =>
        fetch(r.languages_url, { headers })
          .then(r => (r.ok ? r.json() : {}))
          .catch(() => ({}))
      )
    );

    const languages = {};
    languageResults.forEach(repoLangs => {
      Object.entries(repoLangs).forEach(([lang, bytes]) => {
        languages[lang] = (languages[lang] || 0) + bytes;
      });
    });

    res.status(200).json({
      user,
      repos,
      events,
      languages
    });

  } catch (err) {

    res.status(500).json({
      error: "Unable to fetch GitHub data."
    });

  }

}
