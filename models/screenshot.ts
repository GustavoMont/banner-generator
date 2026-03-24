import puppeteer, { LaunchOptions, Page, Viewport } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function getOptions() {
  const isDev = !process.env.AWS_REGION;
  let options: LaunchOptions;

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
      args: puppeteer.defaultArgs({
        args: chromium.args,
        headless: false,
      }),
      executablePath: exePath,
      headless: true,
    };
  } else {
    const viewport = {
      deviceScaleFactor: 1,
      hasTouch: false,
      height: 1080,
      isLandscape: true,
      isMobile: false,
      width: 1920,
    };

    options = {
      args: puppeteer.defaultArgs({
        args: chromium.args,
        headless: "shell",
      }),

      executablePath: await chromium.executablePath(),
      headless: "shell",
      defaultViewport: viewport,
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
  { width, height, ...options }: Viewport = defaultOptions,
) {
  const page = await getPage();

  await page.setViewport({ width, height, ...options });
  await page.setContent(html);

  const file = await page.screenshot({ type: "png" });

  return file;
}
