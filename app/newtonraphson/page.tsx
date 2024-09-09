"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import {HelpCircle} from 'lucide-react'

type Props = {};

export default function page({}: Props) {
  const backgroundStyle = {
    backgroundImage: 'url("/daysky.gif")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  // Estados para los valores del formulario
  const [funcion, setFuncion] = React.useState("");
  const [derivada, setDerivada] = React.useState("");
  const [valorInicial, setValorInicial] = React.useState("");
  const [tolerancia, setTolerancia] = React.useState("");
  const [iteraciones, setIteraciones] = React.useState("");
  const [resultado, setResultado] = React.useState("");

      // Función para evaluar la función y la derivada usando mathjs o similar
      const evaluateFunction = (func: string, value: number) => {
        try {
            const f = new Function('x', `return ${func}`);
            return f(value);
        } catch (error) {
            console.error("Error evaluando la función:", error);
            return null;
        }
    };
    const newtonRaphson = (f: string, df: string, x0: number, tol: number, maxIter: number) => {
        let x = x0;
        for (let i = 0; i < maxIter; i++) {
            const fx = evaluateFunction(f, x);
            const dfx = evaluateFunction(df, x);
            
            if (dfx === null || dfx === 0) {
                setResultado('Derivada es 0 o no se puede calcular, el método no converge');
                return;
            }

            const xNext = x - fx / dfx;

            if (Math.abs(xNext - x) < tol) {
                setResultado(`Solución encontrada: x = ${xNext}`);
                return;
            }

            x = xNext;
        }
        setResultado('No se encontró solución después del número máximo de iteraciones');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const x0 = parseFloat(valorInicial);
        const tol = parseFloat(tolerancia);
        const maxIter = parseInt(iteraciones);

        if (!isNaN(x0) && !isNaN(tol) && !isNaN(maxIter)) {
            newtonRaphson(funcion, derivada, x0, tol, maxIter);
        } else {
            setResultado('Por favor, ingresa valores válidos');
        }
    };

    const setExample =() => {
        setFuncion('x**2 - 4');
        setDerivada('2*x');
        setValorInicial('1');
        setTolerancia('0.0001');
        setIteraciones('20');
    }

  return (
    <main
      style={backgroundStyle}
      className="flex min-h-screen gap-2 flex-col items-center justify-between pt-10 pb-24 px-24"
    >
      <h1 className="text-green-700 text-5xl font-bold font-nerko">
        Newton-Raphson
      </h1>
      <section className="bg-sky-400 p-5 rounded  min-h-[63vh] flex flex-col md:flex-row gap-2">
      <form onSubmit={handleSubmit} className="relative bg-sky-200 max-w-[300px] w-[300px] min-h-[400px] md:h-auto p-3 rounded flex flex-col gap-2">
                    <Input placeholder='Función' className='bg-green-0' value={funcion} onChange={e => setFuncion(e.target.value)} />
                    <Input placeholder='Derivada de la función' className='bg-green-0' value={derivada} onChange={e => setDerivada(e.target.value)} />
                    <Input placeholder='Valor inicial' className='bg-green-0' value={valorInicial} onChange={e => setValorInicial(e.target.value)} />
                    <Input placeholder='Tolerancia' className='bg-green-0' value={tolerancia} onChange={e => setTolerancia(e.target.value)} />
                    <Input placeholder='Iteraciones' className='bg-green-0' value={iteraciones} onChange={e => setIteraciones(e.target.value)} />
                    
                    <Button className='bg-green-700 hover:bg-green-900' type='submit'>Calcular</Button>
                    <span className="text-center">{resultado}</span>
                    <Button title="Ejemplo" onClick={(e) => setExample()} size={'icon'} className="absolute bottom-0 right-0 me-2 mb-2"><HelpCircle/> </Button>
                </form>
      </section>
    </main>
  );
}
