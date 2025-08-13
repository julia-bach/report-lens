import { useProjectNameStore } from "@/store/project-name-store";
import { useEffect, useState } from "react";
import { getProjectName } from "@/utils/get-env";

export function useInitProjectName() {
  const { projectName, setProjectName } = useProjectNameStore();
  const [projects, setProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectFromEnv = getProjectName();

    if (projectFromEnv && projectFromEnv.trim() !== "") {
      setProjectName(projectFromEnv);
      setLoading(false);
      return;
    }

    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects);
      })
      .finally(() => setLoading(false));
  }, [setProjectName]);

  return {
    projectName,
    setProjectName,
    projects,
    loading,
    showDropdown: !getProjectName()?.trim()
  };
}