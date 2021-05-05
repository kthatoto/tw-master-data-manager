export interface BasicObject {
  id: string
  name: string
}

export interface Directory extends BasicObject {}

export const valueCurrencies = ['gold']
export type Currency = 'gold'
export interface Value {
  currency: Currency
  amount: number
}
