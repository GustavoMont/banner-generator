import { geistMono, geistSans } from "@/styles/fonts";
import { TicketRange } from "@/util/html-generator";
import { useState } from "react";

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
        <a
          href={`/api/banner?ticketRange=${card}`}
          download={`/api/banner?ticketRange=${card}`}
          className={`self-center text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none dark:focus:ring-blue-800 ${
            !card
              ? "pointer-events-none bg-gray-400"
              : "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          }`}
        >
          Gerar banner
        </a>
        <p className="text-sm text-yellow-500">
          Você precisa selecionar para qual carnê você quer fazer o banner
        </p>
      </div>
    </div>
  );
}
