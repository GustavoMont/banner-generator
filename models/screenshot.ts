import puppeteer, { Page, Viewport } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function getOptions() {
  const isDev = !process.env.AWS_REGION;
  let options;
  chromium.setHeadlessMode = true;

  // Optional: If you'd like to disable webgl, true is the default.
  chromium.setGraphicsMode = false;

  type ChromeExecPathsSys = "win32" | "linux" | "darwin";
  const chromeExecPaths: Record<ChromeExecPathsSys, string> = {
    win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    linux: "/usr/bin/google-chrome",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  };

  const platform = process.platform as ChromeExecPathsSys;

  const isExecPath = platform in chromeExecPaths;
  const exePath = chromeExecPaths[isExecPath ? platform : "win32"];

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };
  }

  return options;
}

let _page: Page | null;
async function getPage(): Promise<Page> {
  if (_page) {
    return _page;
  }

  const options = await getOptions();
  const browser = await puppeteer.launch(options);

  _page = await browser.newPage();

  return _page;
}

const defaultOptions: Viewport = {
  width: 1080,
  height: 1920,
};

export async function getScreenshot(
  html: string,
  { width, height, ...options }: Viewport = defaultOptions
) {
  const page = await getPage();

  await page.setViewport({ width, height, ...options });
  await page.setContent(html);

  const file = await page.screenshot({ type: "png" });

  return file;
}
