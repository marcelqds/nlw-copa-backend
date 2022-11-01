# nlw-copa-backend
- typescript -D
- fastify
- tsx -D
- prisma -D
- @prisma/client
- npx prisma init --datasource-provider SQLite

Modelo prisma banco de dados.
```prisma
model Pool {
  id String @id @default(cuid())
  title String
  code String @unique
  createdAt DateTime @default(now())   
}
```
- npx prisma migrate dev
- npx prisma studio

- npm i prisma-erd-generator @mermaid-js/mermaid-cli -D

```prisma
generator erd {
    provider = "prisma-erd-generator"
}
```
- npx prisma generate

- npm i @fastify/cors

