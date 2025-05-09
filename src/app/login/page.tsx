"use client";
import { Input, Link } from "@heroui/react";
import { Cat } from "lucide-react";

export default function LoginPage() {
  return (
    <div className={"flex h-full"}>
      <div className="h-screen w-screen bg-gradient-to-br from-defaultAppColors-secondary-500 to-defaultAppColors-primary-400 flex">

        <div className="w-1/2 flex flex-col justify-center pl-60 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="flex flex-row items-center">ReportLens <Cat className="w-[40px] h-[40px] ml-2 mt-1" /></span>
            <span className="text-defaultAppColors-primary-200">Make sense of every test run</span>
          </h1>
          <p className="mb-6 text-lg">
            Turn your automated testing into a source of truth — not just output.
            Built for QA teams and developers who need real visibility into software quality.
          </p>
          <p className="mb-4">
            Open source and crafted with love • Support the project on
            <Link
              showAnchorIcon
              isExternal
              className="text-defaultAppColors-primary-100 hover:text-defaultAppColors-primary-200 ml-1"
              href="https://github.com/julia-bach/report-lens">
              GitHub
            </Link>
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center relative pr-50">
          <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-[500px] h-[500px]">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Hello there! <br/>
              <span className="text-xl">Please enter your credentials to continue</span>
            </h2>

            <div className="gap-5 mb-4 mt-10 flex flex-col items-center">
              <Input
                isRequired
                className="max-w-xs"
                errorMessage="This field cannot be empty."
                classNames={{ clearButton: "text-defaultAppColors-primary-200 hover:defaultAppColors-primary-600" }}
                defaultValue="Username"
                label="Username"
                type="text"
              />
              <Input
                isRequired
                className="max-w-xs"
                errorMessage="This field cannot be empty."
                classNames={{ clearButton: "text-defaultAppColors-primary-200 hover:defaultAppColors-primary-600" }}
                defaultValue="Password"
                label="Password"
                type="password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}