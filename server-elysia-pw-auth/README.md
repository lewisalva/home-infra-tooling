# Elysia with Bun runtime

Multi-tenant system using [Elysia](https://elysiajs.com/) as a REST API. Password authentication w/ [Lucia](https://lucia-auth.com/) for session management. [DrizzleORM](https://orm.drizzle.team/) to handle the PostgreSQL connection.

Includes eslint + prettier to keep code style similar.

## Installation
1. Install bun `curl -fsSL https://bun.sh/install | bash`
1. Run postgres any way you'd like, add a PG_URL to the `.env` file
1. Install dependencies `bun install`
1. Generate initial DB migration `bun run db:generate`
1. Push the migration `bun run db:push`
1. Run the seed to set up the initial user `bun ./seeds/0000_initial-data.ts`

## Development
To start the development server run:

```bash
bun run dev
```

Open [http://localhost:5111/](http://localhost:5111/) with your browser to see the result.
