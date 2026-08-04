import "@testing-library/jest-dom";
import { createElement } from "react";

/**
 * next/image forwards fetchPriority to the DOM <img>, which the test-environment
 * react-dom doesn't recognize yet, causing noisy warnings unrelated to test outcomes.
 */
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"img">) => createElement("img", props),
}));
