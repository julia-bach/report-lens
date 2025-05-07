export const getNextPublicApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

export const getMongoDbUri = (): string => {
  return process.env.MONGODB_URI ?? "";
}

export const getMongoDbName = (): string => {
  return process.env.MONGODB_NAME ?? "";
}

export const getNodeEnv = (): string => {
  return process.env.NODE_ENV ?? "";
}