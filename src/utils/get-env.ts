export const getNextPublicApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}