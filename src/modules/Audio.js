import playbtn from '../img/playbtn.png'
import pausebtn from '../img/pausebtn.png'
import { useState, useRef } from 'react'
import './audio.css'
import RandomNum from './randomNum'

export default function Audio() {
    const random = RandomNum()
    const audioCtxContainer = useRef(null)
    const [playDuration, setPlayDuration] = useState(0)
    const [isPlay, setIsPlay] = useState(false)

    const onPlay = () => {
      audioCtxContainer.current = new AudioContext()
      var arrayBuffer = audioCtxContainer.current.createBuffer(2, audioCtxContainer.current.sampleRate * 3, 
        audioCtxContainer.current.sampleRate)
  
      for (var canal = 0; canal < arrayBuffer.numberOfChannels; canal++){
  
        var donneesCourantes = arrayBuffer.getChannelData(canal)
        for(var i = 0; i < arrayBuffer.length; i++){
          donneesCourantes[i] = random
        }

        var source = audioCtxContainer.current.createBufferSource()

        source.buffer = arrayBuffer

        source.connect(audioCtxContainer.current.destination)

        source.start()

        setIsPlay(true)
  
      }
    }

    const onStop = () => {
      setPlayDuration(audioCtxContainer.current.currentTime)
      audioCtxContainer.current.close()

      setIsPlay(false)
    }

  return (
    <div className='container-audio'>
        {
            isPlay ? <img alt='PauseBtn' src={pausebtn} onClick={onStop} /> :
            <img alt='PlayBtn' src={playbtn} onClick={onPlay} />
        }
    </div>
  )
}
