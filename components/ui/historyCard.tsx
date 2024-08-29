import React from 'react'
import { Undo2 } from 'lucide-react';
import { Button } from './button';

type Props = {}

const HistoryCard = (props: Props) => {
  return (
    <div className='w-[220px] rounded bg-slate-400 p-1 flex justify-between'>
        <p className='text-xs'>
          Valor real 1 - Valor aprox 2
        </p>
        <Button className='size-4 hover:bg-slate-400' size={'icon'} variant={'ghost'}> <Undo2/></Button>
    </div>
  )
}

export {HistoryCard}