"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HistoryCard } from "@/components/ui/historyCard";
import { Input } from "@/components/ui/input";
import {
  History,
  CircleHelp,
  LocateFixed as TableOfContents,
  Trash,
  BookHeart,
  Github,
} from "lucide-react";

export default function Home() {
  // Campos para guardar los valores del formulario
  const [real, setReal] = React.useState<string>("");
  const [prevReal, setPrevReal] = React.useState<string>("");
  const [prevAprox, setPrevAprox] = React.useState<string>("");
  const [prevContador, setPrevContador] = React.useState<number>(0);
  const [aprox, setAprox] = React.useState<string>("");
  const [data, setData] = React.useState<{
    [key: string]: { real: string; aprox: string };
  }>({});
  const isEmpty = Object.keys(data).length === 0;
  const [contador, setContador] = React.useState<number>(1);

  // Guardara el estado de la peticion
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
      setAbsoluteError("");
      setRelativeError("");
      setPorcentualError("");
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
    setIsLoading(true);
    try {
      // Validamos que haya campos
      if (!real || !aprox) {
        return;
      }
      setPrevAprox(aprox);
      setPrevReal(real);

      if (prevReal === real && prevAprox === aprox) {
        return;
      }

      let shouldIncrementCounter = false;
      setData((prevData) => {
        // Verificar si la clave 'contador' ya existe en prevData
        if (prevData.hasOwnProperty(prevContador)) {
          return prevData; // No hagas nada si 'contador' ya existe
        }
        shouldIncrementCounter = true;
        // Si no existe, agregar la nueva entrada
        return {
          ...prevData,
          [contador]: {
            real: real,
            aprox: aprox,
          },
        };
      });

      // Guardamos los errores
      const errors = await calculateErrors(
        parseFloat(aprox) || 0,
        parseFloat(real) || 0
      );
      if (errors.success) {
        if (shouldIncrementCounter) {
          setContador(contador + 1);
        }
      }
      // Asignamos los errores a sus campos
      setAbsoluteError(errors.Absolute);
      setRelativeError(errors.Relative);
      setPorcentualError(errors.Porcentage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setPrevContador(0);
    }
  };

  const ClearData = () => {
    setReal("");
    setAprox("");
    setAbsoluteError("");
    setRelativeError("");
    setPorcentualError("");
  };

  const [isHistoryOpen, setHistoryOpen] = React.useState<boolean>(false);
  const [isInfoOpen, setInfoOpen] = React.useState<boolean>(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const redoCalc = (index?: number, real?: string, aprox?: string) => {
    setPrevAprox("");
    setPrevReal("");
    setPrevContador(index || 0);
    setReal(real || "");
    setAprox(aprox || "");
    setTimeout(() => {
      buttonRef.current?.click();
    }, 200);
  };

  // VISTA PRINCIPAL
  return (
    <main
      style={backgroundStyle}
      className="flex min-h-screen gap-2 flex-col items-center justify-between pt-10 pb-24 px-24"
    >
      <h1 className="text-white text-5xl font-bold  font-nerko">
        Calculadora de errores
      </h1>
      <section className="bg-slate-800 p-5 rounded  min-h-[63vh] flex flex-col md:flex-row gap-2">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-500 max-w-[300px] w-[300px] min-h-[400px] md:h-auto  p-3 rounded flex flex-col gap-2 "
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
          <Button
            ref={buttonRef}
            disabled={isLoading}
            type="submit"
            size={"sm"}
          >
            {isLoading ? "Calculando..." : "Calcular"}
          </Button>
          <article
            className={`pt-5 text-center ${
              absoluteError.trim() != "" ? "" : "hidden"
            }`}
          >
            <h2 className={`text-slate-800 font-bold`}> Resultados : </h2>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              <p className="text-xs">
                {" "}
                {/* Error absoluto: | x - x<sub>2</sub> | = x{" "} */}
                Error absoluto: | {real} - {aprox} | = {absoluteError}
              </p>
              <DialogHelp
                type="absoluto"
                real={parseFloat(real)}
                aprox={parseFloat(aprox)}
                resultado={absoluteError as string}
                campo1="real"
                campo2="aprox"
              />
            </div>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              <p className="text-xs">
                {" "}
                Error relativo: <sup>{absoluteError}</sup>&frasl;
                <sub>{real}</sub> = {relativeError}
              </p>
              <DialogHelp
                type="relativo"
                real={parseFloat(absoluteError)}
                aprox={parseFloat(real)}
                resultado={relativeError as string}
                campo1="error absoluto"
                campo2="real"
              />
            </div>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
              {/* <p className="text-xs"> Error porcentual: er × 100 = x% </p> */}
              <p className="text-xs">
                {" "}
                Error porcentual: {relativeError} × 100 = {porcentualError}%{" "}
              </p>
              <DialogHelp
                type="porcentual"
                real={parseFloat(relativeError)}
                resultado={porcentualError as string}
                campo1="error relativo"
                campo2=""
              />
            </div>
          </article>
          <Button
            size={"icon"}
            onClick={ClearData}
            className={`self-center mt-2 ${!absoluteError ? "hidden" : ""}`}
            variant={"destructive"}
          >
            <Trash />
          </Button>
        </form>
        <div className="flex items-center min-h-[55vh] flex-col gap-2 bg-slate-500 rounded p-3">
          <div className="flex gap-2 justify-end self-end">
            <Button
              variant={"outline"}
              className="rounded-full bg-slate-400 hover:bg-slate-600 border-none "
              size={"icon"}
              onClick={() => {
                setInfoOpen(!isInfoOpen);
                setHistoryOpen(false);
              }}
            >
              <TableOfContents />
            </Button>
            <Button
              variant={"outline"}
              disabled={isEmpty}
              className="rounded-full bg-slate-400 hover:bg-slate-600 border-none"
              size={"icon"}
              onClick={() => {
                setHistoryOpen(!isHistoryOpen);
                setInfoOpen(false);
              }}
            >
              <History />
            </Button>
          </div>
          <aside
            className={`flex flex-col transition-all ease-in delay-75 duration-150 min-w-[260px] ${
              isHistoryOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 h-0"
            }`}
          >
            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-600 max-h-[45vh]">
              {Object.entries(data).map(([key, value]) => (
                <HistoryCard
                  key={key}
                  index={parseFloat(key)}
                  real={value.real}
                  aprox={value.aprox}
                  redoCalc={redoCalc}
                />
              ))}
            </div>
          </aside>
          <aside
            className={`flex flex-col transition-all ease-in delay-75 duration-150 min-w-[240px] ${
              isInfoOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 h-0"
            }`}
          >
            <div className="w-[240px] rounded bg-slate-400 p-1 text-xs">
              <strong> Aplicaciones de los Errores</strong>
              <br />
              <ul>
                <li>
                  <strong>Análisis de Datos:</strong> Permiten evaluar la
                  precisión y exactitud de mediciones, estimaciones y modelos
                  matemáticos.
                </li>
                <li>
                  <strong> Ciencia e Ingeniería:</strong> Se utilizan para
                  cuantificar incertidumbres en experimentos, garantizar la
                  calidad de productos, y mejorar la precisión de mediciones.
                </li>
                <li>
                  <strong>Economía y Finanzas:</strong> Los errores ayudan a
                  analizar la fiabilidad de previsiones y a ajustar modelos
                  predictivos. Estos conceptos son fundamentales para cualquier
                  análisis cuantitativo, ya que proporcionan las herramientas
                  necesarias para entender y minimizar la inexactitud en los
                  resultados.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            {" "}
            <BookHeart />{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-slate-900 border-none text-slate-300 w-[80vw] h-[80vh]">
          <DialogHeader>
            <DialogTitle>Informacion del proyecto</DialogTitle>
            <DialogDescription className="text-slate-600">
              Este es un proyecto realizado para la materia{" "}
              <strong>Metodos Numericos Computacionales</strong> de ITSON
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 ">
            <article className="">
              <h2>Instrucciones:</h2>
              <p className="text-sm">
                La aplicación debe cumplir con lo siguiente:
                <br />
                <span className="text-xs">
                ♦ Recibir 2 números con hasta 4 decimales, siendo el valor
                  calculado y el valor real
                  <br />
                  ♦ Calcular el error absoluto <br />
                  ♦ Calcular el error relativo
                  <br />
                  ♦ Calcular el error porcentual
                  <br />
                  ♦ Guardar un historial de los valores y los errores calculados
                  <br />
                  ♦ Un botón para ver el historial
                  <br />
                  ♦ El historial se limpia
                  <br />
                  cuando se cierra la aplicación
                  <br />
                </span>
              </p>
            </article>
            <div className="flex justify-between">
              <div>
                Stack Utilizado<br />
                <span className="text-xs">
                ♦ Next.js : Framework React <br />
                ♦ Shadcn : Componentes UI <br />
                ♦ Tailwind.css : Estilos utilitarios <br />
                ♦ TypeScript : Tipado estático <br />
                ♦ Vercel : Hospedaje web <br />
                ♦ Lucide : Iconos UI <br />
                ♦ ESLint : Calidad código <br />
                </span>
              </div>
              <div className="flex flex-col items-center">
                <p >Enlaces</p>
                <Button asChild size={'icon'} className="bg-transparent hover:bg-transparent">
                  <Link target="_blank" href="https://github.com/leyv4a/errors-mnc"><Github/></Link>
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-center self-end">
            {/* <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose> */}{" "}
            <Button asChild variant={"link"} className="text-slate-300">
              <Link href="https://github.com/leyv4a" target="_blank">
                Gabriel Leyva Esquivel
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

type Props = {
  type: string;
  real?: number;
  aprox?: number;
  resultado?: string;
  campo1?: string;
  campo2?: string;
};
import { ThumbsUp } from "lucide-react";
import Link from "next/link";

// Dialogo que nos mostrara la ayuda para los calculs
function DialogHelp({ type, real, aprox, resultado, campo1, campo2 }: Props) {
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
            <p>
              Valor {campo1}: <span className="font-bold">{real}</span>
            </p>
            <p>
              {campo2 != "" ? (
                <>
                  Valor {campo2}: <span className="font-bold">{aprox}</span>
                </>
              ) : (
                ""
              )}
            </p>
          </div>
          <div>
            {type == "absoluto" ? (
              <>
                <p className="text-sm mb-2">
                  Formúla: | valor real - valor aprox | = Error absoluto
                </p>
                <p className="text-sm">
                  Sustitución y resultado: | {real} - {aprox} | ={" "}
                  <span className="italic underline decoration-wavy">
                    {resultado}%
                  </span>
                </p>
              </>
            ) : type == "relativo" ? (
              <>
                <p className="text-sm mb-2">
                  Formúla: <sup>error absoluto</sup>&frasl;<sub>valor real</sub>{" "}
                  = Error relativo
                </p>
                <p className="text-sm">
                  Sustitución y resultado: <sup>{real}</sup>&frasl;
                  <sub>{aprox}</sub> ={" "}
                  <span className="italic underline decoration-wavy">
                    {resultado}
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="text-sm mb-2">
                  Formúla: Error porcentual = (error relativo × 100)
                </p>
                <p className="text-sm">
                  Sustitución y resultado: {real} × 100 ={" "}
                  <span className="italic underline decoration-wavy">
                    {resultado}%
                  </span>
                </p>
              </>
            )}
          </div>

          <DialogClose asChild>
            <Button size={"icon"} className="bg-transparent" type="submit">
              <ThumbsUp />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Funcion que calculara los errores
const calculateErrors = async (aprox: number, real: number) => {
  return {
    success: true,
    Absolute: Math.abs(aprox - real).toFixed(4),
    Relative: (Math.abs(aprox - real) / Math.abs(real)).toFixed(4),
    Porcentage: ((Math.abs(aprox - real) / Math.abs(real)) * 100).toFixed(1),
  };
};
