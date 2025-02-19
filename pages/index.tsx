import { geistMono, geistSans } from "@/styles/fonts";
import { TicketRange } from "@/util/html-generator";
import { useState } from "react";
import download from "downloadjs";

export default function Home() {
  const TICKETS_COUNT = 400;
  const TICKETS_PER_CARD = 10;
  const [card, setCard] = useState<TicketRange>();
  const cardOptions = Array.from(
    { length: TICKETS_COUNT / TICKETS_PER_CARD },
    (_, i) => {
      const starts = i * 10 + 1;
      return {
        value: `${starts}-${starts + 9}` as TicketRange,
        option: `${starts}-${starts + 9}`,
      };
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  async function onClickDownload() {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/banner?ticketRange=${card}`);
      const blob = await response.blob();
      download(blob, `rifa-${card}.png`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-5 sm:p-20   font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-4xl text-blue-600">Gerar banner da Rifa</h1>
      <select
        onChange={(e) => setCard(e.target.value as TicketRange)}
        className="px-4 py-3 rounded-full text-black w-full max-w-[500px]"
        value={card ?? ""}
      >
        <option value="" disabled>
          Selecione um carnê
        </option>
        {cardOptions.map(({ option, value }) => (
          <option key={option} value={value}>
            {option}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-1.5 justify-center">
        <button
          onClick={onClickDownload}
          // href={`/api/banner?ticketRange=${card}`}
          // download={`/api/banner?ticketRange=${card}`}
          className={`self-center flex gap-1 items-center text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none dark:focus:ring-blue-800 ${
            !card || isLoading
              ? "pointer-events-none bg-gray-400"
              : "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : null}
          Gerar banner
        </button>
        <p className="text-sm text-yellow-500">
          Você precisa selecionar para qual carnê você quer fazer o banner
        </p>
      </div>
    </div>
  );
}
