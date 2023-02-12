import { rest } from "msw";

export const handlers = [
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
  }),
];
