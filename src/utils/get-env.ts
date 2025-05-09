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

export const getUsername = (): string => {
  return process.env.USERNAME ?? "none";
}

export const getPassword = (): string => {
  return process.env.PASSWORD ?? "none";
}