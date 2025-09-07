import { yupResolver } from "@hookform/resolvers/yup";
import { FC, memo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import schema from "../handlers/urlInputHandlers";
import CipboardCopyField from "./CipboardCopyField";

const InputForm: FC = () => {
  const [shortUrl, setShortUrl] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    setShortUrl("");
    setErrorMessage("");
    startTransition(async () => {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: data.originalUrl }),
      });

      const result = await res.json();

      if (res.ok) {
        setShortUrl(result.shortUrl);
        setErrorMessage("");
      } else {
        setErrorMessage(result.error || "Đã xảy ra lỗi");
      }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <input
          type="url"
          placeholder="https://example.com"
          {...register("originalUrl")}
          className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none focus:ring-0 transition-all duration-200"
        />

        <button
          type="submit"
          className="mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded self-center"
        >
          {isPending ? "Đang xử lý..." : "Rút gọn"}
        </button>
      </form>

      <div className="mt-4 min-h-[58px] w-full ">
        {errorMessage || errors.originalUrl?.message ? (
          <p className="text-red-500">
            {errorMessage || errors.originalUrl?.message}
          </p>
        ) : shortUrl ? (
          <CipboardCopyField value={shortUrl} />
        ) : null}
      </div>
    </>
  );
};

export default memo(InputForm);
