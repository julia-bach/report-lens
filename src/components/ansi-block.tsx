export const AnsiBlock = ({ text, isCode = false, isFailedTest = false }: {
  text?: string; isCode?: boolean; isFailedTest?: boolean
}) => {

  if (!text) {
    return null;
  }

  const cleanText = text.replace(/\u001b\[[0-9;]*m/g, "").replace(/\x1B\[[0-9;]*[JKmsu]/g, "");

  return (
    <pre className={`whitespace-pre-wrap text-xs p-2 rounded overflow-auto max-h-64 font-mono ${ isCode ? "bg-gray-900 text-gray-100" 
      : isFailedTest ? "bg-transparent text-rose-700" : "bg-transparent text-orange-700"}`}>
      {cleanText}
    </pre>
  );
};
