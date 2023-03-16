class AudioWorklet extends AudioWorkletProcessor{
    constructor() {
      super()
  
      // Initialisation des données audio
      this.dataArray = new Float32Array(this.sampleRate * 0.02)
      this.currentPosition = 0
  
      this.port.onmessage = (event) => {
        if (event.data === 'stop') {
          this.stop()
          return
        }
  
        // Ajout des données audio reçues à la position courante
        const inputData = event.data
        for (let i = 0; i < inputData.length; i++) {
          this.dataArray[this.currentPosition] = inputData[i]
          this.currentPosition++
          if (this.currentPosition === this.dataArray.length) {
            this.currentPosition = 0
          }
        }
      }
    }
  
    process(inputs, outputs, parameters) {
      // Copie des données audio dans les canaux de sortie
      const output = outputs[0]
      for (let channel = 0; channel < output.length; channel++) {
        output[channel].set(this.dataArray)
      }
  
      return true
    }
  }
  
  //Permet d'enregistrer un nouveau processeur audio avec le nom spécifié.
  registerProcessor('audio-worklet-processor', AudioWorklet)