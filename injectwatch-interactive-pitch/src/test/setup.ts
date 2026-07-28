import "@testing-library/jest-dom/vitest";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
  value: ResizeObserverMock,
});

Object.defineProperty(globalThis.navigator, "clipboard", {
  value: { writeText: async () => undefined },
  configurable: true,
});

Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
  value() {
    return new DOMRect(0, 0, 1024, 768);
  },
  configurable: true,
});
