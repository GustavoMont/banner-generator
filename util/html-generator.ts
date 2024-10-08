export type TicketRange = `${number}-${number}`;

type GetHtmlParams = {
  numbers: TicketRange;
};

export const getHTML = ({ numbers }: GetHtmlParams) => `
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          margin: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: sans-serif;
  
          background: url(${process.env.APP_URL}/images/banner_base.png);
        }
        .numbers {
            background: #fff;
            margin-top: 72px;
            width: 70%;
            height: 242px;
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
          background: #5271FF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-family: sans-serif;
          color: #fafafa;
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
    ""
  );
  return html;
};
