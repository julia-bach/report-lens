export const AUTH_COOKIE = "auth-token";

export const TOKEN_DURATION = {
  SHORT: 60 * 60, // 1h
  LONG: 60 * 60 * 24 * 30 // 30d
};

export const Routes = {
  LOGIN: "/login",
  HOME: "/",
  TIMELINE: "/timeline"
};

export const dbCollectionPrefix = "report-lens__";