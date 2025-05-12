"use client";
import { Button, Checkbox, Input, Link } from "@heroui/react";
import { Cat, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <div className={"flex h-full"}>
      <div className="h-screen w-screen bg-gradient-to-br from-defaultAppColors-secondary-500 to-defaultAppColors-primary-400 flex">

        <div className="w-1/2 flex flex-col justify-center pl-60 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="flex flex-row items-center">{t("reportLens")} <Cat className="w-[40px] h-[40px] ml-2 mt-1" /></span>
            <span className="text-defaultAppColors-primary-200">{t("loginPage.subtitle")}</span>
          </h1>

          <p className="mb-6 text-lg">{t("loginPage.description")}</p>
          <p className="mb-4">
            {t("loginPage.devMessage")}
            <Link
              showAnchorIcon
              isExternal
              className="text-defaultAppColors-primary-100 hover:text-defaultAppColors-primary-200 ml-1"
              href="https://github.com/julia-bach/report-lens">
              {t("loginPage.github")}
            </Link>
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center relative pr-50">
          <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-[450px] h-[450px]">

            <h2 className="text-3xl font-semibold text-center mb-5 mt-2 text-defaultAppColors-primary-300">
              {t("loginPage.hello")}
            </h2>
            <p className="text-[16px] font-normal text-center mt-6 text-gray-500">{t("loginPage.loginMessage")}</p>

            <div className="gap-5 mt-5 flex flex-col items-center">
              <Input
                isRequired
                className="max-w-xs mb-4"
                errorMessage={t("loginPage.emptyField")}
                label={t("loginPage.username")}
                type="text"
                size="lg"
              />
              <Input
                isRequired
                className="max-w-xs mb-5"
                errorMessage={t("loginPage.emptyField")}
                label={t("loginPage.password")}
                type="password"
                size="lg"
              />
            </div>

            <Checkbox
              defaultSelected
              size="md"
              className="ml-[46px] mb-7"
              classNames={{
                label: "text-gray-400"
              }}
              color="default"
            >
              {t("loginPage.rememberUser")}
            </Checkbox>
            
            <div className="justify-center flex">
              <Button
                endContent={<LogIn className="h-[20px] w-[20px]" />}
                className="bg-defaultAppColors-primary-300 font-medium text-white text-large hover:bg-defaultAppColors-primary-500 w-[20rem]"
                size="lg"
              >
                {t("loginPage.signIn")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}