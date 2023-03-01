import React, { useEffect, useState } from 'react'

const sizeBuffer = 20
const limiteBuffer = 50

export default function RandomNum() {
    const [random, setRandom] = useState([])
    const [temprandom, setTempRandom] = useState([])

    const interval = setInterval(() => {},20)

    useEffect(()=>{
        let random = []

        random = Math.random() * 2 - 1
        setTempRandom(arr => [...arr, random])
    }, [interval])

    useEffect(()=>{
        let a = [...temprandom]

        setRandom(a.splice(a.length-sizeBuffer, sizeBuffer))
    }, [interval])

    useEffect(()=>{
        if(temprandom.length >= limiteBuffer){
            temprandom.splice(0, limiteBuffer-20)
        }
    }, [interval])
 
  return {random}
}