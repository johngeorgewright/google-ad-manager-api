import { PaginateOptions, paginate } from './paginate'

/**
 * Iterate through results of possibly inifite, paginated queries.
 *
 * @see {@link PaginateOptions}
 * @see {@link paginate}
 * @example
 * ```
 * for await (const item of iterate({
 *   executeQuery: (limit, offset) =>
 *     query(
 *       client,
 *       'getLineItemsByStatementAsync',
 *       { limit, offset }
 *     )
 * })) {
 *   console.info(item)
 * }
 * ```
 */
export async function* iterate<T>(
  options: PaginateOptions<T>,
): AsyncGenerator<T> {
  for await (const { items } of paginate(options))
    for (const item of items) yield item
}
