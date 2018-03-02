const alphabet = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
const base = alphabet.length

export function encode(num) {
  let encoded = ''
  while (num) {
    const remainder = num % base
    num = Math.floor(num / base)
    encoded = alphabet[remainder].toString() + encoded
  }
  return encoded
}

export function decode(str) {
  let decoded = 0
  while (str) {
    const index = alphabet.indexOf(str[0])
    const power = str.length - 1
    decoded += index * Math.pow(base, power)
    str = str.substring(1)
  }
  return decoded
}
