import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { useTMDB } from "@/hooks/useTMDB";

const server = setupServer(
  rest.get("https://api.themoviedb.org/3/movie/popular*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        results: [
          {
            id: 1,
            title: "Movie 1",
          },
        ],
      })
    );
  })
);

describe("useTMDB", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("returns initial state", async () => {
    const { result } = renderHook(({ url }: { url: string }) => useTMDB(url), {
      initialProps: { url: "/movie/popular" },
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(undefined);
    expect(result.current.data).toBe(undefined);
  });

  it("returns data", async () => {
    const { result, rerender } = renderHook(
      ({ url }: { url: string }) => useTMDB(url),
      {
        initialProps: { url: "/movie/popular" },
      }
    );

    expect(result.current.loading).toBe(false);
  });

  it("returns error", async () => {
    //
  });
});
