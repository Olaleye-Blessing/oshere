import { Matcher, MatcherOptions } from "@testing-library/react";

export type GetByTestId = (
  id: Matcher,
  options?: MatcherOptions | undefined
) => HTMLElement;
