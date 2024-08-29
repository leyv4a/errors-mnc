"use client"
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
} from "@/components/ui/dialog"
import { HistoryCard } from "@/components/ui/historyCard";
import { Input } from "@/components/ui/input";
import { History, CircleHelp } from 'lucide-react';


export default function Home() {

  const [real, setReal] = React.useState<number>();
  const [aprox, setAprox] = React.useState<number>();

  const backgroundStyle = {
    backgroundImage: 'url("/starsky.gif")', 
    backgroundSize: 'cover',  
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center',  
  };


 
  const handleSubmit = async () =>{

  }

  return (
    <main style={backgroundStyle} className="flex min-h-screen h-screen flex-col items-center justify-between pt-10 pb-24 px-24">
      <h1 className="text-white text-5xl font-bold mb-10 font-nerko"> Calculadora de errores</h1>
      <section className="bg-slate-800 h-full  p-5 rounded flex gap-2">
        <form className="bg-slate-500 p-3 rounded flex flex-col gap-2 ">
          <Input value={real} onChange={(e) => setReal(Number(e.target.value))} placeholder="Valor real"/>
          <Input value={aprox} onChange={(e) => setAprox(Number(e.target.value))}   placeholder="Valor aprox"/>
          <Button type="submit"  size={'sm'}>Calcular</Button>
          <article className="pt-5 text-center ">
            <h2 className="text-slate-800 font-bold"> Resultados : </h2>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
            {/* <p className="text-sm">Formula:  <span>  |</span></p> */}
            <p className="text-xs"> Error absoluto: | x - x<sub>2</sub> | = x </p>
            {/* ESTE QUIERO QUE SEA EL TRIGGER DEL DIALOG PARA MOSTRAR EL PROCEDIMIENTO DE LA FORMULA */}
            {/* <Button className="size-4 hover:bg-slate-400" variant={'ghost'} size={'icon'}><CircleHelp/></Button> */}
            <DialogHelp real={1} aprox={2} type="absoluto" />
            </div>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
            <p className="text-xs"> Error relativo:  <sup>ea</sup>&frasl;<sub>x</sub>  = x </p>
            <Button className="size-4 hover:bg-slate-400" variant={'ghost'} size={'icon'}><CircleHelp/></Button>
            </div>
            <div className="rounded bg-slate-400 p-2 mt-2 text-start flex justify-between">
            <p className="text-xs"> Error porcentual:  er × 100 = x% </p>
            <Button className="size-4 hover:bg-slate-400" variant={'ghost'} size={'icon'}><CircleHelp/></Button>
            </div>
          </article>
        </form>
       <div className="flex flex-col gap-2 bg-slate-500 rounded p-3">
       <Button variant={'outline'} className="rounded-full bg-slate-400 hover:bg-slate-600 border-none self-end " size={'icon'}><History/></Button>
        <aside className=" flex flex-col  ">
        <div>
           <HistoryCard/>
        </div>
        </aside>
       </div>
      </section>
    </main>
  );
}



type Props = {
  type : string,
  real : number,
  aprox: number
}
function DialogHelp({real, aprox} : Props){
  return (
    <>
     <Dialog>
      <DialogTrigger asChild>
      <Button className="size-4 hover:bg-slate-400" variant={'ghost'} size={'icon'}><CircleHelp/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
           {real}
          </DialogDescription>
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
  )
}


type AbsoluteProps = {
  aprox: number,
  real : number
}
const calculateErrors= ({aprox, real} : AbsoluteProps) =>  {
  return {
      Absolute : Math.abs(aprox - real),
      Relative : (Math.abs(aprox - real) / Math.abs(real)),
      Porcentage : (Math.abs(aprox - real) / Math.abs(real)) * 100,
  };
}