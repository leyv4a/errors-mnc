"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HistoryCard } from "@/components/ui/historyCard";
import { Input } from "@/components/ui/input";
import { History, CircleHelp } from "lucide-react";

export default function Home() {

  // Campos para guardar los valores del formulario
  const [real, setReal] = React.useState<string>("");
  const [aprox, setAprox] = React.useState<string>("");

  // Campos para guardar el resultado de la funcion calcular errores
  const [absoluteError, setAbsoluteError] = React.useState<string>("");
  const [relativeError, setRelativeError] = React.useState<string>("");
  const [porcentualError, setPorcentualError] = React.useState<string>("");

  // Controlador para validar el cambio en los inputs
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Expresión regular para aceptar solo números con un máximo de 4 decimales
      const regex = /^\d*\.?\d{0,4}$/;

      // Solo actualizar el estado si el valor coincide con el patrón
      if (regex.test(value)) {
        setter(value);
      }
    };

    // Estilos en cascada para usar nuestro fondo personalizado
  const backgroundStyle = {
    backgroundImage: 'url("/starsky.gif")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  // Función asíncrona para manejar la peticion del usuario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setIsLoading(true)
    try {
      // Validamos que haya campos
      if (!real || !aprox) {
        return;
      }
      // Guardamos los errores
      const errors = await calculateErrors(
        parseFloat(aprox) || 0,
        parseFloat(real) || 0
      );
      // Asignamos los errores a sus campos
      setAbsoluteError(errors.Absolute);
      setRelativeError(errors.Relative);
      setPorcentualError(errors.Porcentage);
      console.log(errors);
    } catch (error) {
      console.log(error);
    }
  };

  // VISTA PRINCIPAL
  return (
    <main
      style={backgroundStyle}
      className="flex min-h-screen h-screen flex-col items-center justify-between pt-10 pb-24 px-24"
    >
      <h1 className="text-white text-5xl font-bold mb-10 font-nerko">
        Calculadora de errores
      </h1>
      <section className="bg-slate-800 h-full  p-5 rounded flex gap-2">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 max-w-[300px] w-[300px] p-3 rounded flex flex-col gap-2 "
        >
          <Input
            value={real}
            onChange={handleInputChange(setReal)}
            placeholder="Valor real"
          />
          <Input
            value={aprox}
            onChange={handleInputChange(setAprox)}
            placeholder="Valor aprox"
          />
          <Button type="submit" size={"sm"}>
            Calcular
          </Button>
          <article className={`pt-5 text-center ${absoluteError.trim() != '' ? '' : 'hidden'}`}>
            <h2 className={`text-slate-800 font-bold`}> Resultados : </h2>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              <p className="text-xs">
                {" "}
                {/* Error absoluto: | x - x<sub>2</sub> | = x{" "} */}
                Error absoluto: | {real} - {aprox} | = {absoluteError}
              </p>
              <DialogHelp type="absoluto" real={parseFloat(real)} aprox={parseFloat(aprox)} resultado={absoluteError as string}/>
            </div>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              <p className="text-xs">
                {" "}
                Error relativo: <sup>{absoluteError}</sup>&frasl;<sub>{real}</sub> = {relativeError}
              </p>
              <DialogHelp type="relativo" real={parseFloat(absoluteError)} aprox={parseFloat(real)} resultado={relativeError as string}/>
            </div>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              {/* <p className="text-xs"> Error porcentual: er × 100 = x% </p> */}
              <p className="text-xs"> Error porcentual: {relativeError} × 100 = {porcentualError}% </p>
              <DialogHelp type="porcentual" real={parseFloat(relativeError)} resultado={porcentualError as string}/>
            </div>
          </article>
        </form>
        <div className="flex flex-col gap-2 bg-slate-500 rounded p-3">
          <Button
            variant={"outline"}
            className="rounded-full bg-slate-400 hover:bg-slate-600 border-none self-end "
            size={"icon"}
          >
            <History />
          </Button>
          <aside className="flex flex-col">
            <div>
              <HistoryCard />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

type Props = {
  type: string;
  real?: number;
  aprox?: number;
  resultado? : string
};
import { ThumbsUp } from 'lucide-react';

// Dialogo que nos mostrara la ayuda para los calculs
function DialogHelp({type, real, aprox, resultado} : Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="size-4 hover:bg-slate-400"
            variant={"ghost"}
            size={"icon"}
          >
            <CircleHelp />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-900 border-0 text-slate-300">
          <DialogHeader>
            <DialogTitle>Explicación cálculo de error {type}</DialogTitle>
          </DialogHeader>
            <div className="flex gap-2 text-xs">
              <p> Valor real: <span className="font-bold">{real}</span></p>  <p>Valor aproximado: <span className="font-bold">{aprox}</span></p>
            </div>
            <div>
              {type == 'absoluto' ? 
                <>
                <p className="text-sm mb-2">Formúla: | valor real - valor aprox | = Error absoluto</p>
                <p className="text-sm">Sustitución y resultado: | {real} - {aprox} | = {resultado}</p>
                </>
              : type == 'relativo' ?
              <>
                <p className="text-sm mb-2">Formúla: <sup>error absoluto</sup>&frasl;<sub>valor real</sub> = Error relativo</p>
                <p className="text-sm">Sustitución y resultado: <sup>{real}</sup>&frasl;<sub>{aprox}</sub> = {resultado}</p>
              </>
              :
              <>
              <p className="text-sm mb-2">Formúla: Error porcentual = (error relativo × 100)</p>
              <p className="text-sm">Sustitución y resultado: {real} × 100 = {resultado}%</p>
              </>
              }
            </div>

          <DialogClose asChild>
            <Button size={'icon'} className="bg-transparent" type="submit"><ThumbsUp/></Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Funcion que calculara los errores
const calculateErrors = async (aprox: number, real: number) => {
  return {
    Absolute: Math.abs(aprox - real).toFixed(4),
    Relative: (Math.abs(aprox - real) / Math.abs(real)).toFixed(4),
    Porcentage: ((Math.abs(aprox - real) / Math.abs(real)) * 100).toFixed(1),
  };
};
