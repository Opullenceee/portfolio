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

    res.status(200).json({
      user,
      repos,
      events
    });

  } catch (err) {

    res.status(500).json({
      error: "Unable to fetch GitHub data."
    });

  }

}
