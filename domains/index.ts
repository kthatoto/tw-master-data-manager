export interface Directory {
  fullPath: string
  name: string
}

export interface BasicObject {
  fullPath: string
  name: string
  size: number
  raw: string | null
}

export const valueCurrencies = ['gold']
export type Currency = 'gold'
export interface Value {
  currency: Currency
  amount: number
}
