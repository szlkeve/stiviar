export const defaultFetchFn = async (url: string) => {
  const res = await fetch(url);
  const resJson: unknown = await res.json();
  return resJson;
};
