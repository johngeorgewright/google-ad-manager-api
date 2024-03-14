export type GetByStatementResponseResult<F extends GetByStatementAsync<any>> =
  F extends GetByStatementAsync<infer T> ? T : never

export interface GetByStatementAsync<T extends Object> {
  (
    getByStatement: GetByStatement,
  ): Promise<
    [
      result: GetByStatementResponse<T>,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >
}

export interface GetByStatement {
  filterStatement?: FilterStatement
}

export interface FilterStatement {
  query?: string
  values?: Array<Values>
}

export interface Values {
  key?: string
  value?: Value
}

export interface Value {}

export interface GetByStatementResponse<T> {
  rval?: Rval<T>
}

export interface Rval<T> {
  totalResultSetSize?: number
  startIndex?: number
  results?: Array<T>
}
