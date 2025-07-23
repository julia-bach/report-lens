export const getNextPublicApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
};

export const getMongoDbUri = (): string => {
  return process.env.MONGODB_URI ?? "";
};

export const getMongoDbName = (): string => {
  return process.env.MONGODB_NAME ?? "";
};

export const getNodeEnv = (): string => {
  return process.env.NODE_ENV ?? "";
};

export const getOptionalLogo = (): string | null => {
  return process.env.NEXT_PUBLIC_LOGO_URL ?? null;
};

export const getProjectName = (): string | undefined => {
  const project = process.env.NEXT_PUBLIC_PROJECT ?? undefined;
  return project?.toLowerCase();
};