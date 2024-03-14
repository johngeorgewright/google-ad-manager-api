# @johngw/google-ad-manager-api

A fully typed library to access Google's Ad Manager.

## Installation

```
npm install @johngw/google-ad-manager-api
```

## Usage

### Simple queries

```typescript
import {
  GoogleAdManager,
  In,
  Not,
  Like,
  query,
} from '@johngw/google-ad-manager-api'

const api = new GoogleAdManager({
  applicationName: 'MY_APPLICATION_NAME',
  networkCode: 123456789,
  jwtOptions: {
    key: 'MY_JWT_KEY',
    email: 'MY_JWT_EMAIL',
    scopes: ['https://www.googleapis.com/auth/dfp'],
  },
})

const client = await api.createLineItemServiceClient()

const [response] = await query(client, 'getLineItemsByStatementAsync', {
  limit: 10,
  where: {
    orderId: In(1, 2, 3),
    id: Not(11222),
    name: Like('foo %'),
    orderName: 'Foo',
  },
})

expect(response.rval?.results).toHaveLength(10)
```

The following will produce the same result albeit more verbose:

```typescript
import {
  LineItemService,
  In,
  Not,
  Like,
  pql,
} from '@johngw/google-ad-manager-api'

const [response] = await client.getLineItemsByStatementAsync({
  filterStatement: {
    query: pql<LineItemService.LineItems>({
      limit: 10,
      where: {
        orderId: In(1, 2, 3),
        id: Not(11222),
        name: Like('foo %'),
        orderName: 'Foo',
      },
    }),
  },
})
```

You can also type the `pql` function with JSDocs:

```javascript
/**
 * @typedef {import('@johngw/google-ad-manager-api').PQL<
 *   import('@johngw/google-ad-manager-api').LineItemService.LineItems
 * >} LineItemsPQL
 */

const [response] = await client.getLineItemsByStatementAsync({
  filterStatement: {
    query: /** @type {LineItemsPQL} */ (pql)({
      limit: 10,
      where: {
        orderId: In(1, 2, 3),
        id: Not(11222),
        name: Like('foo %'),
        orderName: 'Foo',
      },
    }),
  },
})
```

### Paginated queries

When quering large amounts of data, you'd generally want to use GAM's pagination feature. Use the `iterate` function to help iterate through all individual items in paginated queries.

```typescript
import { GoogleAdManager, iterate, query } from '@johngw/google-ad-manager-api'

const api = new GoogleAdManager({
  applicationName: 'MY_APPLICATION_NAME',
  networkCode: 123456789,
  jwtOptions: {
    key: 'MY_JWT_KEY',
    email: 'MY_JWT_EMAIL',
    scopes: ['https://www.googleapis.com/auth/dfp'],
  },
})

const client = await api.createLineItemServiceClient()

for await (const result of iterate({
  executeQuery: (limit, offset) =>
    query(client, 'getLineItemsByStatementAsync', {
      limit,
      offset,
    }),
})) {
  console.info(result)
}
```
