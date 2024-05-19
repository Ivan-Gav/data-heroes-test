import { ref } from "vue";
import { getCharacters, getEpisode } from "rickmortyapi";
import type { Character, Info, ApiResponse, Episode } from "rickmortyapi";

function getFirstEpisodeNrByUrl(character: Character) {
  const a = character.episode[0].split("/");
  return Number(a[a.length - 1]);
}

function filterDublicates<T>(arr: T[]): T[] {
  if (!arr) {
    return [];
  }
  return Array.from(new Set(arr));
}

function getEpisodeMap(episodes: Episode[]) {
  return Object.fromEntries(
    episodes.map((episode) => [episode.id, episode.name])
  );
}

type QueryParams = {
  page?: number
}

export async function useFetch(queryParams: QueryParams) {
  const { page } = queryParams
  const data = ref<ApiResponse<Info<Character[]>> | null>(null);
  const error = ref<string | null>(null);

  try {
    const response = await getCharacters({ page });
    data.value = response;
    if (!response.data.results) {
      throw new Error("no data in server response :(");
    }
    const episodeNumbers = filterDublicates(
      response.data.results.map((character) =>
        getFirstEpisodeNrByUrl(character)
      )
    );
    if (episodeNumbers) {
      const episodes = await getEpisode(episodeNumbers);
      const episodeMap = getEpisodeMap(episodes.data);
      response.data.results.forEach(
        (character) =>
          (character.episode[0] = episodeMap[getFirstEpisodeNrByUrl(character)])
      );
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = "unknown error occured by fetching data from server";
    }
  }

  return { data: data.value ? data.value.data : null, error: error.value };
}
