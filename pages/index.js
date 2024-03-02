import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import HomePage from "@/components/HomePage";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Elevate</title>
        <meta
          name="description"
          content="Elevate - take you style to the next level"
        />
      </Head>
      <HomePage />
    </div>
  );
}
