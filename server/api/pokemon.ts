import fs from 'fs'
import type { Pokemon } from '~/types/pokemon'

export default defineEventHandler(async (event) => {
  const { skip, take, search, orderBy, type } = await readBody(event)
  const data = fs.readFileSync('./jsonData/pokemonStripped.json')
  const parsedData = JSON.parse(data)

  let returnValues = parsedData
  if (type) {
    const filter = type.toLowerCase()
    returnValues = returnValues.filter((pokemon: Pokemon) => pokemon.types.includes(filter))
  }
  if (search) {
    const filter = search.toLowerCase()
    returnValues = returnValues.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(filter))
  }

  returnValues.sort(orderBy === 'asc' ? compareAsc : compareDesc)

  const spliced = returnValues.slice(skip, skip + take)
  return { results: spliced, options: { skip: skip, take: take, type: type, search: search, orderBy: orderBy }, total: returnValues.length }
})

function compareAsc(a: Pokemon, b: Pokemon) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

function compareDesc(a: Pokemon, b: Pokemon) {
  if (a.name < b.name) {
    return 1
  }
  if (a.name > b.name) {
    return -1
  }
  return 0
}
