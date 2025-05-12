"use server"

export const getUsername = async (): Promise<string> => {
  return process.env.APP_USERNAME ?? "none";
}

export const getPassword = async (): Promise<string> => {
  return process.env.APP_PASSWORD ?? "none";
}