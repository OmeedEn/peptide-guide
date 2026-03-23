/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  output: isGithubPages ? 'export' : undefined,
  basePath: isGithubPages ? '/peptide-guide' : '',
  images: {
    unoptimized: true,
  },
}
module.exports = nextConfig
