import type { Pokemon, PokemonFull, PokemonMove, PokemonType } from '~/types/pokemon'
import type { TypesResponse } from '~/types/response'

export const API_BASE_URL = 'https://pokeapi.co/api/v2'

type GetPokemonType = {
  name: string
}

export function getPokemon({ name }: GetPokemonType) {
  return useFetch<PokemonFull>(`${API_BASE_URL}/pokemon/${name}`)
}

export function getPokemonType(name?: string) {
  return useFetch<TypesResponse>(`${API_BASE_URL}/type/${name || ''}`)
}

/**
 * Rewrite json
 */
export async function rewriteJson() {
  return await useFetch('/api/icecream', { query: { flavor: 'chocolate' } })
}

/**
 * USED TO POPULATE JSON FILE
 */
export async function decoratedPokemon() {
  const req = await fetch(`${API_BASE_URL}/pokemon/?offset=${0}&limit=${2000}`)
  const data = await req.json()

  const responses = await Promise.all(data.results.map(async (pokemon: Pokemon) => {
    const response = await fetch(`${API_BASE_URL}/pokemon/${pokemon.name}`)
    const data = await response.json()
    return {
      abilities: data.abilities,
      base_experience: data.base_experience,
      height: data.height,
      weight: data.weight,
      name: data.name,
      types: data.types.map((type: PokemonType) => type.type.name),
      stats: data.stats,
      moves: data.moves.map((move: PokemonMove) => move.move.name),
    }
  }))

  return { ...data, results: responses }
}
