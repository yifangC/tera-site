export function useMDXComponents(components) {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-red-500">{children}</h1>
    ),
    ...components,
  }
}