import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// GitHub Actions setea GITHUB_REPOSITORY como "owner/repo" -> base "/repo/".
// Local (env ausente) -> "/", como requiere dev/preview.
const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
