import { Button } from "@/components/ui/button";
import { HistoryCard } from "@/components/ui/historyCard";
import { Input } from "@/components/ui/input";
import { History } from 'lucide-react';


export default function Home() {

  const backgroundStyle = {
    backgroundImage: 'url("/starsky.gif")', 
    backgroundSize: 'cover',  
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center',  
  };

  return (
    <main style={backgroundStyle} className="flex min-h-screen h-screen flex-col items-center justify-between pt-10 pb-24 px-24">
      <h1 className="text-white text-5xl font-bold mb-10 font-nerko"> Calculadora de errores</h1>
      <section className="bg-slate-800 h-full  p-5 rounded flex gap-2">
        <form className="bg-slate-500 p-3 rounded flex flex-col gap-2 ">
          <Input placeholder="Valor real"/>
          <Input placeholder="Valor aprox"/>
          <Button type="submit" size={'sm'}>Calcular</Button>
          <article className="pt-5 text-center">
            <h2 className="text-slate-800 font-bold"> Resultados : </h2>
            <div className="rounded bg-slate-400 p-2 mt-2">
            <p className="text-sm">Error absoluto <span> | x - x<sub>2</sub> |</span></p>
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
