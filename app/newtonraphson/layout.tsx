import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Newton-Raphson",
  description: "Aplicación que resuelve el metodo Newton-Raphson",
};

export default function NewtonRaphsonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
    {children}
   </div>
  );
}
