import assetNever from 'assert-never'
import { Comparable } from './condition/comparable'

export function formatValue(value: Comparable): string {
  switch (typeof value) {
    case 'boolean':
      return value.toString().toUpperCase()
    case 'number':
      return value.toString()
    case 'string':
      return value.startsWith(':') ? value : `'${value.replaceAll("'", "\\'")}'`
    case 'object':
      return `'${value.toISOString()}'`
    default:
      assetNever(value)
  }
}
