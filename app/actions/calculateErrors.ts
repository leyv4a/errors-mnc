"use server";

type AbsoluteProps = {
    aprox: number,
    real : number
}
export const calculateErrors= ({aprox, real} : AbsoluteProps) =>  {
    return {
        Absolute : Math.abs(aprox - real),
        Relative : (Math.abs(aprox - real) / Math.abs(real)),
        Porcentage : (Math.abs(aprox - real) / Math.abs(real)) * 100,
    };
}