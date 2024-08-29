import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History } from 'lucide-react';


export default function Home() {

  const backgroundStyle = {
    backgroundImage: 'url("/starsky.gif")', // Reemplaza con la ruta de tu GIF
    backgroundSize: 'cover',  // Ajusta el tamaño del fondo
    backgroundRepeat: 'no-repeat',  // Evita que el GIF se repita
    backgroundPosition: 'center',  // Centra el GIF
  };

  return (
    <main style={backgroundStyle} className="flex min-h-screen h-screen flex-col items-center justify-between p-24">
      <section className="bg-slate-800 h-full  p-5 rounded flex gap-2">
        <form className="bg-slate-500 p-3 rounded flex flex-col gap-2 ">
          <Input placeholder="Numero 1"/>
          <Input placeholder="Numero 2"/>
          <Button type="submit" size={'sm'}>Calcular</Button>
        </form>
       <div className="flex flex-col gap-2 bg-slate-500 rounded p-3">
       <Button variant={'outline'} className="rounded-full bg-slate-400 hover:bg-slate-600 border-none self-end " size={'icon'}><History/></Button>
        <aside className="bg-slate-200 flex flex-col  hidden">
        <div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
        </aside>
       </div>
      </section>
    </main>
  );
}
