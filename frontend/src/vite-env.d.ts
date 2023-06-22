/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string,
  readonly VITE_BE_URL: string,
  readonly VITE_BINANCE_URL: string,
  readonly VITE_APP_PORT: number,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
