import { getScreenshot } from "@/models/screenshot";
import { getHTML, TicketRange } from "@/util/html-generator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function banner(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ticketRangeParam = req.query.ticketRange;
  const ticketRange = Array.isArray(ticketRangeParam)
    ? ticketRangeParam.at(0)
    : ticketRangeParam;

  if (!ticketRange) {
    return res
      .status(400)
      .json({ message: "Não é possível criar o banner para esse carnê" });
  }

  const html = getHTML({ numbers: ticketRange as TicketRange });

  const file = await getScreenshot(html, { height: 1080, width: 1080 });

  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + `banner-rifa-${ticketRange}.png`
  );
  res.end(file);
}
