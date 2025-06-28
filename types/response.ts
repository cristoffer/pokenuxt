import type { Pokemon } from './pokemon'

export type PokemonResponse = {
  results: Array<Pokemon>
  total?: number
  options?: {
    skip: number
    take: number
    type?: string
    search?: string
    orderBy?: string
  }
}

export type TypesResponse = {
  results: Array<PokemonTypeResponse>
  total?: number
}

export type PokemonTypeResponse = {
  name: string
  url: string
}
