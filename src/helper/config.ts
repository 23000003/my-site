const dev = process.env.NODE_ENV !== "production";

console.log(process.env.NODE_ENV);
console.log(dev);

export const server = dev
  ? "http://localhost:3000"
  : "https://my-site-mocha-three.vercel.app";