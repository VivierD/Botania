import playbtn from '../img/playbtn.png'
import pausebtn from '../img/pausebtn.png'
import { useState, useRef } from 'react'
import './audio.css'
import RandomNum from './randomNum'

//constructeur d'audio worklet
class AudioWorkletSource extends AudioWorkletNode {
  constructor(context, options) {
    super(context, 'audio-worklet-processor' , options)
    this.port.onmessage = (event) => {
      if (event.data === 'stop') {
        this.port.postMessage('stop')
        return
      }
      this.port.postMessage(event.data)
    }
  }
}

export default function Audio() {
  const audioCtxContainer = useRef(null)
  const [isPlay, setIsPlay] = useState(false)
  const [volume, setVolume] = useState(0.2)
  const [frequency, setFrequency] = useState(1000) // <-- ajout de la variable fréquence

  //function lié au bouton Play, lance l'audio
  const onPlay = e => {
    audioCtxContainer.current = new AudioContext()

    // Création de l'AudioWorkletSource pour le traitement audio
    audioCtxContainer.current.audioWorklet.addModule('audio-worklet-processor').then(() => {
      const audioWorkletSource = new AudioWorkletSource(audioCtxContainer.current, {
        outputChannelCount: [2],
      })

      // Envoi des données audio à l'AudioWorkletSource toutes les 20ms
      setInterval(() => {
        const dataArray = new Float32Array(audioCtxContainer.current.sampleRate * 0.02)
        const frequencyValue = frequency // <-- ajout de la variable fréquence
        for (let i = 0; i < dataArray.length; i++) {
          const t = i / audioCtxContainer.current.sampleRate
          //RandonNum est utilisé lors du télétravail/pas d'accès à la Raspberry, on utilis normalement les données reçus en bluetooth.
          dataArray[i] = RandomNum() * volume * Math.sin(2 * Math.PI * frequencyValue * t)
        }
        audioWorkletSource.port.postMessage(dataArray)
      }, 20)

      // Démarrage de l'AudioWorkletSource
      audioWorkletSource.connect(audioCtxContainer.current.destination)

      setIsPlay(true)
    }).catch(error=>console.log(error))
  }

  //function permettant de stopper l'audio
  const onStop = () => {
    audioCtxContainer.current.close()
    setIsPlay(false)
  }

    //function permettant de gérer le volume
    const onVolumeChange = (event) => {
      const newVolume = parseFloat(event.target.value)
      setVolume(newVolume)
    }
    
    const onFrequencyChange = (event) => {
      const newFrequency = parseInt(event.target.value)
      setFrequency(newFrequency)
    }

  return (
    <div className="container-audio">
      {isPlay ? (
        <img className='PausePlaybtn' alt="PauseBtn" src={pausebtn} onClick={() => onStop()} />
      ) : (
        <img className='PausePlaybtn' alt="PlayBtn" src={playbtn} onClick={() => onPlay()} />
      )}
      <div className='slider'>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => onVolumeChange(event)} />
        <p>Volume</p>
      </div>
      <div className='slider'>
        <input type="range" min="100" max="2000" step="1" value={frequency} onChange={(event) => onFrequencyChange(event)} />
        <p>Fréquence</p>
      </div>
    </div>
  )
}