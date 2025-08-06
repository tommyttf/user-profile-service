import { defineConfig } from "vitest/config";
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: './.env.test' })

export default defineConfig({
  test: {
    include: ["src/**/*.spec.ts"],
    fileParallelism: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});
