"use client";
import { Button, Checkbox, Input, Link } from "@heroui/react";
import { Cat, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useRef, useState } from "react";
import { useCredentialsStore } from "@/store/credentials-store";
import { toast } from "react-toastify";
import { getPassword, getUsername } from "@/utils/get-env-server-side";

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();

  const envUsername = useRef("");
  const envPassword = useRef("");

  const { username, password, setUsername, setPassword } = useCredentialsStore(
    useShallow((state) => state)
  );

  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  useEffect(() => {
    Promise.all([getUsername(), getPassword()]).then(([user, pass]) => {
      envUsername.current = user;
      envPassword.current = pass;
    })
  }, []);

  const handleCredentials = () => {
    if(envUsername.current !== username || envPassword.current !== password) {
      toast.error("Invalid username or password");
      return
    }
    router.push("/");
  }

  const goToHome = () => {
    const isUsernameValid = username.trim() !== "";
    const isPasswordValid = password.trim() !== "";

    setIsUsernameEmpty(!isUsernameValid);
    setIsPasswordEmpty(!isPasswordValid);

    if (isUsernameValid && isPasswordValid) {
      handleCredentials();
    }
  }

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
          <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-[450px] h-[480px]">

            <h2 className="text-3xl font-semibold text-center mb-5 mt-3 text-defaultAppColors-primary-300">
              {t("loginPage.hello")}
            </h2>
            <p className="text-[16px] font-normal text-center mt-8 text-gray-500">{t("loginPage.loginMessage")}</p>

            <div className="gap-5 mt-5 flex flex-col items-center">
              <Input
                isRequired
                className={`max-w-xs ${isUsernameEmpty ? "mb-0" : "mb-4" } `}
                errorMessage={t("loginPage.emptyField")}
                label={t("loginPage.username")}
                type="text"
                size="lg"
                value={username}
                onValueChange={(username) => {
                  setUsername(username);
                  if (isUsernameEmpty) {
                    setIsUsernameEmpty(false);
                  }
                }}
                isInvalid={isUsernameEmpty}
              />
              <Input
                isRequired
                className={`max-w-xs ${isPasswordEmpty ? "mb-1" : "mb-6" } `}
                errorMessage={t("loginPage.emptyField")}
                label={t("loginPage.password")}
                type="password"
                size="lg"
                value={password}
                onValueChange={(password) => {
                  setPassword(password);
                  if (isPasswordEmpty) {
                    setIsPasswordEmpty(false);
                  }
                }}
                isInvalid={isPasswordEmpty}
              />
            </div>

            <Checkbox
              defaultSelected
              size="md"
              className="ml-[50px] mb-7"
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
                onPress={goToHome}
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