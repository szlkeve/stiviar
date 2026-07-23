export const mockFetchFn = async (
  url: string,
  mockData: Record<string, unknown>,
): Promise<unknown> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData[url] ?? null), 100);
  });
};
