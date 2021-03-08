export interface Directory {
  path: string
  name: string
}

export interface BasicObject {
  path: string
  name: string
  size: number
  data: string | null
}

export const valueCurrencies = ['gold']
export type Currency = 'gold'
export interface Value {
  currency: Currency
  amount: number
}
