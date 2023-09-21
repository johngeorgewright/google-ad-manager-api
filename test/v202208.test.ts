import { v202308, pql } from '../src'
import { load as dotenv } from 'dotenv-extended'

beforeAll(() =>
  dotenv({
    errorOnMissing: true,
    includeProcessEnv: true,
  }),
)

let api: v202308.GoogleAdManager

beforeEach(() => {
  api = new v202308.GoogleAdManager({
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

  const [response] = await client.getLineItemsByStatementAsync({
    filterStatement: {
      query: pql<v202308.LineItemService.LineItems>({ limit: 10 }),
    },
  })

  expect(response.rval?.results).toHaveLength(10)
})
