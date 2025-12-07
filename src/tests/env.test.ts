import { getMongoDbName, getMongoDbUri, getNextPublicApiUrl, getOptionalLogo, getProjectName } from "@/utils/get-env";

describe("get-env helpers", () => {
  it("reads and normalizes environment variables", () => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com";
    process.env.MONGODB_URI = "mongodb://localhost:27017";
    process.env.MONGODB_NAME = "reportlens";
    process.env.NEXT_PUBLIC_LOGO_URL = "https://logo";
    process.env.NEXT_PUBLIC_PROJECT = "ReportLens";

    expect(getNextPublicApiUrl()).toBe("https://api.example.com");
    expect(getMongoDbUri()).toBe("mongodb://localhost:27017");
    expect(getMongoDbName()).toBe("reportlens");
    expect(getOptionalLogo()).toBe("https://logo");
    expect(getProjectName()).toBe("reportlens");
  });

  it("returns undefined for project name when not provided", () => {
    delete process.env.NEXT_PUBLIC_PROJECT;
    expect(getProjectName()).toBeUndefined();
  });
});
