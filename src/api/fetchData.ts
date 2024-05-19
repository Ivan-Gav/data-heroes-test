import { getCharacters, getEpisode } from "rickmortyapi";
import type { Character, Info, ApiResponse, Episode } from "rickmortyapi";

function getFirstEpisodeNrByUrl(character: Character) {
  const a = character.episode[0].split("/");
  return Number(a[a.length - 1]);
}

function filterDublicates<T>(arr: T[] | undefined): T[] {
  if (!arr) {
    return [];
  }
  return Array.from(new Set(arr));
}

function getEpisodeMap(episodes: Episode[] | Episode) {
  console.log("I got this:");
  console.log(episodes);

  if (Array.isArray(episodes)) {
    return Object.fromEntries(
      episodes.map((episode) => [episode.id, episode.name])
    );
  } else {
    return { [episodes.id]: episodes.name }
  }
}

type QueryParams = {
  page?: number;
  name?: string;
  status?: "Alive" | "Dead" | "unknown" | "";
};

export async function fetchData(queryParams: QueryParams) {
  const { page, name, status } = queryParams;
  let data: ApiResponse<Info<Character[]>> | null = null;

  const options: QueryParams = { page: page || 1 };
  if (name) {
    options.name = name;
  }
  if (status) {
    options.status = status;
  }

  const response = await getCharacters(options);
  data = response;
  const episodeNumbers = filterDublicates(
    response.data.results?.map((character) => getFirstEpisodeNrByUrl(character))
  );
  if (episodeNumbers) {
    const episodes = await getEpisode(episodeNumbers);
    const episodeMap = getEpisodeMap(episodes.data);
    response.data.results?.forEach(
      (character) =>
        (character.episode[0] = episodeMap[getFirstEpisodeNrByUrl(character)])
    );
  }

  return data;
}
