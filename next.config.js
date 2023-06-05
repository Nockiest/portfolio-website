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
   
};