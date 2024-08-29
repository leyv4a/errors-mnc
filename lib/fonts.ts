import { Nerko_One } from "next/font/google";

const NerkoOne_Init = Nerko_One({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-nerko",
  })


  export const nerkoone = NerkoOne_Init.variable;