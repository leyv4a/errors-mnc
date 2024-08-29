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
      <section className="bg-slate-800 h-full w-1/2 p-5 rounded flex gap-2">
        <form className="bg-slate-500 p-3 rounded flex flex-col gap-2 w-1/2">
          <Input className="bg-slate-400"  placeholder="Numero 1"/>
          <Input type="text" placeholder="Numero 1"/>
        </form>
        <Button variant={'outline'} className="rounded-full bg-slate-500 hover:bg-slate-600 border-none" size={'icon'}><History/></Button>
      </section>
    </main>
  );
}
