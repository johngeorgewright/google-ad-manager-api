import { GoogleAdManager, iterate, query } from '../src'
import { load as dotenv } from 'dotenv-extended'
import { LineItems } from '../src/service/v202308/lineitemservice'

let api: GoogleAdManager

beforeAll(() => {
  dotenv({
    errorOnMissing: true,
    includeProcessEnv: true,
  })

  api = new GoogleAdManager({
    applicationName: 'google-ad-manager-api CI test',
    networkCode: Number(process.env.NETWORK_CODE),
    jwtOptions: {
      key: process.env.JWT_KEY,
      email: process.env.JWT_EMAIL,
      scopes: ['https://www.googleapis.com/auth/dfp'],
    },
  })
})

test('line items', async () => {
  const client = await api.createLineItemServiceClient()

  const [response] = await query(client, 'getLineItemsByStatementAsync', {
    limit: 10,
  })

  expect(response.rval?.results).toHaveLength(10)
}, 10_000)

test('pagination', async () => {
  const client = await api.createLineItemServiceClient()
  const items: LineItems[] = []

  for await (const result of iterate({
    pageSize: 10,
    executeQuery: (limit, offset) =>
      query(client, 'getLineItemsByStatementAsync', {
        limit,
        offset,
      }),
  })) {
    items.push(result)
    if (items.length === 20) break
  }

  expect(items).toHaveLength(20)
}, 10_000)
