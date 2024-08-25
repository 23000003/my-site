const dev = process.env.NODE_ENV !== "production" || "Production";

export const server = dev
  ? "http://localhost:3000"
  : "https://my-site-mocha-three.vercel.app";