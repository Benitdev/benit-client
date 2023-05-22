export const durationToSecond = (value: string) => {
  const numbers = value.match(/\d+/g)
  console.log(numbers)
  const totalSecond = numbers?.reduce((second, amount, index) => {
    let times = 1
    switch (index - numbers?.length) {
      case -3: {
        times = 60 * 60
        break
      }
      case -2: {
        times = 60
        break
      }
      case -1: {
        times = 1
        break
      }
    }
    return second + Number(amount) * times
  }, 0)

  return totalSecond
}

export const secondToString = (value: number) => {
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = Number(value) % 60
  return [hours, minutes, seconds]
}
