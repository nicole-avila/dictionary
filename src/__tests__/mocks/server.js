import { rest } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/lady",
    (_req, res, ctx) => res(ctx.json({ word: mockWords }))
  )
);
