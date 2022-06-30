import React, { FC, useEffect, useMemo, useState }  from "react";
import { interval, tap } from "rxjs";
import { useObservable } from "./utils/rxjs-react-helpers";
import Counter from "./rxjs-counter/counter";

type AppProps = {
  message: string;
};


export function App({ message }: AppProps) {
  

  
   

  return <div> count: { 0  } -  { message} </div>

   
} 

