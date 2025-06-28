import type { Pokemon } from "~/types/pokemon"

const API_BASE_URL = 'https://pokeapi.co/api/v2'

type GetPokemonType = {
  skip?: number
  take?: number
  name?: string
}

interface ISearchPokemon {
  skip: number
  take: number
  search?: string
  type?: string
}

export function getPokemon({ skip, take, name }: GetPokemonType) {
  if (name) {
    return useFetch(`${API_BASE_URL}/pokemon/${name}`)
  }

  return useFetch(`${API_BASE_URL}/pokemon/?offset=${skip}&limit=${take}`)
}

export function getPokemonForms(name: string) {
  return useFetch(`${API_BASE_URL}/pokemon-form/${name}/`)
}

export function getPokemonType(name?: string) {
  return useFetch(`${API_BASE_URL}/type/${name || ''}`)
}

export async function searchPokemon({ skip, take, type, search }: ISearchPokemon) {
  return await useFetch('/api/pokemon', { method: 'POST', body: { skip: skip, take: take, type: type, search: search } })
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
      types: data.types.map(type => type.type.name),
      stats: data.stats,
      moves: data.moves.map(move => move.move.name),
    }
  }))

  return { ...data, results: responses }
}
