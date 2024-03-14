import { setTimeout } from 'node:timers/promises'
import { GetByStatementResponse } from './statement'

export interface PaginateOptions<T> {
  /**
   * The "LIMIT" passed to queries
   */
  pageSize?: number

  startingOffset?: number

  /**
   * If you want to make sure not to exceed your query quota,
   * you can apply an interval inbetween each query
   */
  interval?: number

  /**
   * How to execute your query
   */
  executeQuery(
    limit: number,
    offset: number,
  ):
    | Promise<GetByStatementResponse<T>>
    | Promise<[GetByStatementResponse<T>, ...any[]]>
}

/**
 * Paginate queries.
 *
 * @see {@link PaginateOptions}
 * @see {@link iterate}
 * @example
 * ```
 * for await (const page of paginate({
 *   executeQuery: (limit, offset) =>
 *     query(
 *       client,
 *       'getLineItemsByStatementAsync',
 *       { limit, offset }
 *     )
 * })) {
 *   console.info(page.items)
 * }
 * ```
 */
export async function* paginate<T>({
  executeQuery,
  interval = 0,
  pageSize = 100,
  startingOffset = 0,
}: PaginateOptions<T>): AsyncGenerator<{
  items: T[]
  pageNum: number
}> {
  let offset = startingOffset
  let finished = false
  let pageNum = 0

  while (!finished) {
    const result = await executeQuery(pageSize, offset)
    const response = Array.isArray(result) ? result[0] : result
    const items = response.rval?.results || []

    if (items.length) yield { items, pageNum: ++pageNum }

    finished = items.length < pageSize

    if (!finished) {
      offset += pageSize
      await setTimeout(interval)
    }
  }
}
