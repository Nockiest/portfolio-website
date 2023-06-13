/** @type {import('next').NextConfig} */
// const nextConfig = {
//     sassOptions: {
//         includePaths: [path.join(__dirname, 'styles')],
//       },
// }

// module.exports = nextConfig


const path = require('path');
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
      topLevelImportPaths: [],
      meaninglessFileNames: ["index"],
      cssProp: true,
      namespace: "",
      minify: false,
      transpileTemplateLiterals: false,
      pure: false,
    },
  },
};