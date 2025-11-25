"use client";
import useSWR from "swr";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/services/axios-instance";
import { GenericObject } from "@/types/generic-types";
import { Accordion, AccordionItem } from "@heroui/react";
import { AnsiBlock } from "@/components/ansi-block";
import { capitalize } from "@heroui/shared-utils";
import { FolderRoot } from "lucide-react";
import { deriveSpecState } from "@/utils/utils";

export const Report = () => {
  const project = (useSearchParams().get("project") || "").toString();
  const id = (useSearchParams().get("reportId") || "").toString();

  const fetchData = async () => {
    const res = await apiClient.get(`/api/reports/${project}/${id}`);
    return res?.data;
  };

  const { data } = useSWR(`/api/reports/${project}/${id}`, fetchData, { suspense: true });

  const allSpecs = useMemo(() =>
    data.suites.flatMap((suite: GenericObject) =>
      suite.specs.map((spec: GenericObject) => ({
        title: spec.title,
        tests: spec.tests.map((test: GenericObject) => ({
          results: test.results.map((result: GenericObject) => ({
            duration: result.duration,
            status: result.status,
            error: result.error
          })),
          status: test.status,
          projectName: test.projectName
        })),
        tags: spec.tags,
        ok: spec.ok,
        file: spec.file
      }))
    ), [data]
  );

  const SPEC_UI = {
    failed: {
      box: "bg-rose-50 border-none",
      before: "before:bg-rose-300",
      tagBg: "bg-rose-100",
      badgeText: "",
      badgeTextClass: "text-rose-700"
    },
    flaky: {
      box: "bg-orange-50 border-none",
      before: "before:bg-orange-300",
      tagBg: "bg-orange-100",
      badgeText: "",
      badgeTextClass: "text-orange-700"
    },
    skipped: {
      box: "bg-gray-50 border-none",
      before: "before:bg-gray-300",
      tagBg: "bg-gray-100",
      badgeText: "All tests skipped",
      badgeTextClass: "text-gray-700"
    },
    passed: {
      box: "bg-emerald-50 border-none",
      before: "before:bg-emerald-300",
      tagBg: "bg-emerald-100",
      badgeText: "All tests passed",
      badgeTextClass: "text-emerald-700"
    }
  };

  const testCardClass = (status: string) => {
    switch (status) {
      case "expected":
        return "bg-emerald-100 border-emerald-200";
      case "skipped":
        return "bg-gray-100 border-gray-200";
      case "flaky":
        return "bg-orange-100 border-orange-200";
      default:
        return "bg-rose-100 border-rose-200";
    }
  };

  const errorPanelClass = (status: string) =>
    status === "unexpected" ? "bg-rose-50 border border-rose-200" : "bg-orange-50 border border-orange-200";

  return (
    <div className="w-full max-w-7xl mx-auto items-center justify-center pt-16 pb-16">
      <Accordion selectionMode="multiple" variant="splitted">
        {allSpecs.map((spec: any, i: number) => {
          const state = deriveSpecState(spec);
          const ui = SPEC_UI[state];

          if (state === "passed" || state === "skipped") {
            return (
              <AccordionItem key={i} aria-label={spec.title}
                className={`relative overflow-hidden pl-5 rounded-xl shadow-none border ${ui.box} pointer-events-none
                  before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:content-[''] ${ui.before}`}
                title={
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium">{capitalize(spec.title)}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1 flex-wrap">
                        {spec.tags?.map((tag: string, t: number) => (
                          <span key={t} className={`text-xs ${ui.tagBg} text-gray-700 px-2 py-0.5 rounded-full`}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className={`text-xs font-medium ${ui.badgeTextClass}`}>{ui.badgeText}</span>
                    </div>
                  </div>
                }
              />
            );
          }

          return (
            <AccordionItem key={i} aria-label={spec.title}
              className={`relative overflow-hidden pl-5 rounded-xl shadow-none border ${ui.box}
                before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:content-[''] ${ui.before}`}
              title={
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{capitalize(spec.title)}</span>
                  <div className="flex gap-1 flex-wrap">
                    {spec.tags?.map((tag: string, t: number) => (
                      <span key={t} className={`text-xs ${ui.tagBg} text-gray-700 px-2 py-0.5 rounded-full`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              }
            >
              <div className="flex flex-col gap-3 p-3">
                {spec.tests.map((test: any, j: number) => {
                  const cardCls = testCardClass(test.status);
                  const isFailed = test.status === "unexpected";

                  return (
                    <div key={j} className={`p-3 rounded-lg border ${cardCls}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {test.status === "expected" ? "Passed" : capitalize(test.status)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Duration: {test.results?.[0]?.duration ?? "-"}ms
                        </span>
                      </div>

                      {test.results.map((result: any, k: number) => {
                        if (!result.error) {return null;}

                        return (
                          <div key={k} className={`mt-3 text-sm ${errorPanelClass(test.status)} rounded p-3`}>
                            <AnsiBlock text={result.error.message} isFailedTest={isFailed} />

                            {result.error.snippet && (
                              <details className="mt-2">
                                <summary className={`cursor-pointer ${isFailed ? "text-rose-600" : "text-orange-600"} text-sm font-medium`}>
                                  View code snippet
                                </summary>
                                <AnsiBlock text={result.error.snippet} isCode />
                              </details>
                            )}

                            {result.error.location && (
                              <p className="mt-2 text-xs text-gray-600 flex items-center gap-1.5">
                                <FolderRoot className="text-gray-500" height={14} width={14} />
                                <span className="truncate">{spec.file}</span>
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
