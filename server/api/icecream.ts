import fs from 'fs'

export default defineEventHandler(async () => {
  const data = fs.readFileSync('./jsonData/pokemon.json')
  const parsedData = JSON.parse(data);

  const lite = parsedData.map(pokemon => {
    return {
      abilities: pokemon.abilities,
      base_experience: pokemon.base_experience,
      height: pokemon.height,
      weight: pokemon.weight,
      name: pokemon.name,
      types: pokemon.types.map(type => type.type.name),
      stats: pokemon.stats,
      moves: pokemon.moves.map(move => move.move.name),
      sprites: {
        front_default: pokemon.sprites.front_default,
        back_default: pokemon.sprites.back_default,
      },
    }
  })

  try {
    fs.writeFileSync('./jsonData/pokemonStripped.json', JSON.stringify(lite, null, 2), 'utf8')
  }
  catch (e) {
    console.log('###############')
    console.error(e)
  }

  return { values: ['la', 'lalala', 'lalalalala'] }
})
