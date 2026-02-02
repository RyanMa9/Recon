const API_URL = process.env.NEXT_PUBLIC_API_URL;

// function to make request to backend api and search for given fighter name/id based on text input
export async function searchFighter(name: string) {
  const result = await fetch(
    `${API_URL}/fighters/search?name=${encodeURIComponent(name)}`
  );
  const data = await result.json();

  return data;
}

// function to make request to backend api and search for fighter division based on given fighterId
export async function getFighterDivisions(fighterId: string) {
  const result = await fetch(
    `${API_URL}/fighters/${encodeURIComponent(fighterId)}/division`
  );
  const data = await result.json();
  return data;
}

// function to make request to backend api, search for fighter stats with given fighterId, division, and number of years to look at
export async function getFighterStats(
  fighterId: string,
  division: string,
  year: string
) {
  let url = `${API_URL}/fighters/${encodeURIComponent(
    fighterId
  )}/stats?division=${encodeURIComponent(division)}`;

  if (year) url += `&years=${encodeURIComponent(year)}`;
  const result = await fetch(url);
  const data = await result.json();

  return data;
}

// function to make request to backend api, search for fighter personal metrics like name/height, etc with given fighterId
export async function getFighterMetrics(fighterId: string) {
  const url = `${API_URL}/fighters/${encodeURIComponent(fighterId)}/metrics`;

  const result = await fetch(url);
  const data = await result.json();

  return data;
}
