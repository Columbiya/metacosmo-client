export const required = value => value ? undefined: 'Required'

export const mustBeDividedWithSymb = value => value.split('|||').length === 2 ? undefined: 'Строка должна быть с разделителем |||'
