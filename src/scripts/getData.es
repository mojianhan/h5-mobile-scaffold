import ajax from './ajax'

async function getData(data) {
  console.log('pending')

  const result = await ajax(data)

  console.log(result)
  console.log('ok')

  return result
}

export default getData
