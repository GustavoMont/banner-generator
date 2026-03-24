export type TicketRange = `${number}-${number}`;

type GetHtmlParams = {
  numbers: TicketRange;
};

export const getHTML = ({ numbers }: GetHtmlParams) => `
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Poppins:wght@600&display=swap');

        body {
          margin: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
  
          background: url(${process.env.APP_URL}/images/banner_base.png);
        }
        .numbers {
            background: #00bf63;
            margin-top: 80px;
            width: 70%;
            height: 260px;
            padding: 0 40px;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: 51px 51px;
            column-gap: 52px;
            row-gap: 80px;
        }
        .number {
          width: 110px;
          height: 110px;
          background: #f6f4ef;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.1rem;
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          color: #00bf63;
        }
      </style>
    </head>
    <body>
        <div class="numbers" >
            ${generateNumberDivs(numbers)}
        </div>
    </body>
  </html>
  `;

const generateNumberDivs = (range: TicketRange): string => {
  const [fromString, toString] = range.split("-");
  const from = Number(fromString);
  const to = Number(toString);
  const diff = to - from;
  const cardNumbers = Array.from({ length: diff + 1 }, (v, i) => from + i);

  const html = cardNumbers.reduce(
    (acc, current) => acc.concat(`<div class="number">${current}</div>`),
    "",
  );
  return html;
};
