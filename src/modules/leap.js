import {leafInfo, leafDeviceOption} from './utils.js';
import { useEffect, useState } from "react";
import { MyLines, My3Lines } from '../components/components';
import Audio from './Audio';
import './leap.css'
import bleBTN from '../img/BLEicon.png'

const sizeBuffer = 20
const limiteBuffer = 50
export const LeafData = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [dataMax, setDataMax] = useState(new Array(sizeBuffer).fill(0))
    const [dataMin, setDataMin] = useState(new Array(sizeBuffer).fill(0))
    const [dataNorm, setDataNorm] = useState(new Array(sizeBuffer).fill(0))
    const [dataFilter, setDataFilter] = useState(new Array(sizeBuffer).fill(0))
    const [tempNorm, setTempNorm] = useState(new Array(sizeBuffer).fill(0))
    const [tempFilter, setTempFilter] = useState(new Array(sizeBuffer).fill(0))
    const [tempMin, setTempMin] = useState(new Array(sizeBuffer).fill(0))
    const [tempMax, setTempMax] = useState(new Array(sizeBuffer).fill(0))

    const interval = setInterval(() => {}, 20);

    useEffect(()=>{
        if(tempNorm.length >= limiteBuffer){
            tempNorm.splice(0, limiteBuffer-20)
        }
        if(tempFilter.length >= limiteBuffer){
            tempFilter.splice(0, limiteBuffer-20)
        }
        if(tempMax.length >= limiteBuffer){
            tempMax.splice(0, limiteBuffer-20)
        }
        if(tempMin.length >= limiteBuffer){
            tempMin.splice(0, limiteBuffer-20)
        }
    },[interval])
    
  
    useEffect(()=>{
        let d = [...tempNorm]
        let y = [...tempFilter]
        let a = [...tempMin]
        let b = [...tempMax]
        setDataFilter(y.splice(y.length-sizeBuffer,sizeBuffer))
        setDataNorm(d.splice(d.length-sizeBuffer, sizeBuffer))
        setDataMin(a.splice(a.length-sizeBuffer, sizeBuffer))
        setDataMax(b.splice(b.length-sizeBuffer, sizeBuffer))
    },[interval])
  
    function handleValueChanged(event){
        let value = event.target.value
        let sample = new Uint16Array(value.buffer)
        setTempMax(maxArray => [...maxArray, sample[0]])
        setTempMin(minArray => [...minArray, sample[1]])
        setTempNorm(normArray => [...normArray, sample[2] / 63535 * 100])
        setTempFilter(filterArray => [...filterArray, sample[3]])
    }

    const connect = async() => {
        navigator.bluetooth.requestDevice(leafDeviceOption)
        .then(device => {
            console.log('Connecting to GATT...')
            return device.gatt.connect()
        })
        .then( server => {
            console.log(`Getting Service...`)
            setIsConnected(true);
            return server.getPrimaryService(leafInfo.primaryService)
        })
        .then(service => {
            console.log('Getting Characteristics...')
            return Promise.all([
                service.getCharacteristic(leafInfo.uid)
                .then(char => char.startNotifications())
                .then(char => {
                    char.addEventListener('characteristicvaluechanged', handleValueChanged)
                })
            ])
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='container'>
            <div className='navb'>
                <img src={bleBTN} className='ble-btn' onClick={connect}/>
                <Audio />
            </div>
            <div className='chart'>
                <MyLines id ="Normalisé" dataNorm={dataNorm} />
                <My3Lines id ="Filtré" dataFilter={dataFilter} dataMin={dataMin} dataMax={dataMax}/>
            </div>
        </div>
    )
}
