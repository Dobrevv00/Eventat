import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // Правните URL-и трябва да работят за прегледа на Meta. Общите условия
      // живеят на /obshti-usloviya; /usloviya се пренасочва към тях.
      {
        source: "/usloviya",
        destination: "/obshti-usloviya",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
