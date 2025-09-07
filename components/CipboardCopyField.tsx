import React, { FC, memo, useState } from "react";
import { Clipboard } from "lucide-react";

const CipboardCopyField: FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <div className="mt-4 w-full flex items-center justify-between border border-gray-300 p-2 rounded">
      <p>{value}</p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        className="cursor-pointer"
      >
        {copied ? "Copied!" : <Clipboard />}
      </button>
    </div>
  );
};

export default memo(CipboardCopyField);
