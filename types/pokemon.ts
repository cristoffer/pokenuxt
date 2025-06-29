export type Pokemon = {
  abilities: Array<PokemonAbility>
  base_experience: number
  height: number
  weight: number
  name: string
  types: Array<string>
  stats: Array<PokemonStat>
  moves: Array<string>
  sprites: {
    front_default: string
    back_default: string
  }
}

export type PokemonFull = {
  abilities: Array<PokemonAbility>
  base_experience: number
  height: number
  weight: number
  name: string
  types: Array<PokemonType>
  stats: Array<PokemonStat>
  moves: Array<PokemonMove>
  sprites: {
    front_default: string
    back_default: string
    other?: {
      home?: {
        front_default: string
      }
    }
  }
}

export type PokemonMove = {
  move: {
    name: string
    url: string
  }
  version_group_details: Array<VersionGroupDetail>
}

export type VersionGroupDetail = {
  level_learned_at: number
  move_learn_method: {
    name: string
    url: string
  }
  order: number
  version_group: {
    name: string
    url: string
  }
}

export type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

export type PokemonAbility = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export type PokemonStat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}
