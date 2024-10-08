import puppeteer, { Page } from "puppeteer-core";
import chrome from "chrome-aws-lambda";

export async function getOptions() {
  const isDev = !process.env.AWS_REGION;
  let options;

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
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
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

export async function getScreenshot(html: string) {
  const page = await getPage();

  await page.setViewport({ width: 1080, height: 1920 });
  await page.setContent(html);

  const file = await page.screenshot({ type: "png" });

  return file;
}
