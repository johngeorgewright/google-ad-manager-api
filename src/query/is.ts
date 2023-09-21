import { Statement } from './condition'

export type Isable = boolean | string | number

export class IsStatement<T extends Isable = Isable> extends Statement<T> {
  override statement(prop: string): string {
    return `${prop} = ${this.formatValue()}`
  }

  formatValue(): string {
    switch (typeof this.value) {
      case 'boolean':
        return this.value.toString().toUpperCase()
      case 'number':
        return this.value.toString()
      default:
        return `'${this.value.replace("'", "\\'")}'`
    }
  }
}

export function Is<T extends Isable>(value: T) {
  return new IsStatement(value)
}