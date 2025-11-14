interface headersOptions {
  split: string;
}

export const HEADERS_OPTIONS: headersOptions = {
  split: process.env.SPLIT!
}
