import { ref } from 'vue'
import { getCharacters } from 'rickmortyapi'
import type { Character, Info, ApiResponse } from 'rickmortyapi';

export async function useFetch() {
  const data = ref<ApiResponse<Info<Character[]>> | null>(null)
  const error = ref<string | null>(null)

  try {
    data.value = await getCharacters({ page: 1 })
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'unknown error occured by fetching data from server'
    }
  }

  return { data: data.value ? data.value.data : null , error: error.value }
}