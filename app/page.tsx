"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HistoryCard } from "@/components/ui/historyCard";
import { Input } from "@/components/ui/input";
import { History, CircleHelp } from "lucide-react";

export default function Home() {
  const [real, setReal] = React.useState<string>("");
  const [aprox, setAprox] = React.useState<string>("");

  const [absoluteError, setAbsoluteError] = React.useState<string>("");
  const [relativeError, setRelativeError] = React.useState<string>("");
  const [porcentualError, setPorcentualError] = React.useState<string>("");

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

  const backgroundStyle = {
    backgroundImage: 'url("/starsky.gif")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setIsLoading(true)
    try {
      const errors = await calculateErrors(
        parseFloat(aprox) || 0,
        parseFloat(real) || 0
      );
      setAbsoluteError(errors.Absolute);
      setRelativeError(errors.Relative);
      setPorcentualError(errors.Porcentage);
      console.log(errors);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      style={backgroundStyle}
      className="flex min-h-screen h-screen flex-col items-center justify-between pt-10 pb-24 px-24"
    >
      <h1 className="text-white text-5xl font-bold mb-10 font-nerko">
        {" "}
        Calculadora de errores
      </h1>
      <section className="bg-slate-800 h-full  p-5 rounded flex gap-2">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 p-3 rounded flex flex-col gap-2 "
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
          <article className="pt-5 text-center ">
            <h2 className="text-slate-800 font-bold"> Resultados : </h2>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              {/* <p className="text-sm">Formula:  <span>  |</span></p> */}
              <p className="text-xs">
                {" "}
                {/* Error absoluto: | x - x<sub>2</sub> | = x{" "} */}
                Error absoluto: | {real} - {aprox} | = {absoluteError}
              </p>
              {/* ESTE QUIERO QUE SEA EL TRIGGER DEL DIALOG PARA MOSTRAR EL PROCEDIMIENTO DE LA FORMULA */}
              {/* <Button className="size-4 hover:bg-slate-400" variant={'ghost'} size={'icon'}><CircleHelp/></Button> */}
              <DialogHelp real={1} aprox={2} type="absoluto" />
            </div>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              <p className="text-xs">
                {" "}
                {/* Error relativo: <sup>ea</sup>&frasl;<sub>x</sub> = x{" "} */}
                Error relativo: <sup>{absoluteError}</sup>&frasl;<sub>{real}</sub> = {relativeError}
              </p>
              <Button
                className="size-4 hover:bg-slate-400"
                variant={"ghost"}
                size={"icon"}
              >
                <CircleHelp />
              </Button>
            </div>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              {/* <p className="text-xs"> Error porcentual: er × 100 = x% </p> */}
              <p className="text-xs"> Error porcentual: {relativeError} × 100 = {porcentualError}% </p>
              <Button
                className="size-4 hover:bg-slate-400"
                variant={"ghost"}
                size={"icon"}
              >
                <CircleHelp />
              </Button>
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
          <aside className=" flex flex-col  ">
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
};
function DialogHelp({ real, aprox }: Props) {
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>{real}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {aprox}
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              Username
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

type AbsoluteProps = {
  aprox: number;
  real: number;
};
const calculateErrors = async (aprox: number, real: number) => {
  return {
    Absolute: Math.abs(aprox - real).toFixed(4),
    Relative: (Math.abs(aprox - real) / Math.abs(real)).toFixed(4),
    Porcentage: ((Math.abs(aprox - real) / Math.abs(real)) * 100).toFixed(1),
  };
};
