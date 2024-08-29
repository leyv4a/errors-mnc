import React from 'react'
import { Undo2 } from 'lucide-react';
import { Button } from './button';

type Props = {
    index: number,
    real?: string,
    aprox?: string,
    redoCalc : (index?:number, real?: string, aprox?: string) => void;
}

const HistoryCard = ({index, real, aprox, redoCalc}: Props) => {
  return (
    <div className='w-[220px] rounded bg-slate-400 p-1 flex justify-between mb-2'>
        <p className='text-xs'>
         [ {index} ] Valor real {real} - Valor aprox {aprox}
        </p>
        <Button onClick={()=>redoCalc(index, real, aprox)} className='size-4 hover:bg-slate-400' size={'icon'} variant={'ghost'}> <Undo2/></Button>
    </div>
  )
}

export {HistoryCard}