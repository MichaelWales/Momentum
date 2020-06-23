import React, { useRef, useState, useEffect } from "react";
import backgroundSounds from '../sounds/background.mp3'
import cNote from '../sounds/CNote.mp3'
import gNote from '../sounds/GNote.mp3'
import aNote from '../sounds/ANote.mp3'
import dNote from '../sounds/DNote.mp3'
import backgroundnew from '../sounds/backgroundnew.mp3'
import jingleC from '../sounds/jingleC.mp3'
import jingleF from '../sounds/jingleF.mp3'
import jingleG from '../sounds/jingleG.mp3'
import jingleC2 from '../sounds/jingleC2.mp3'
import { prepareCanvasWithSquares, calculateAudioCoordinates, trackSquares } from '../utils/squares.js'
import { prepareCanvasCircles, calculateDistance, trackCircles, calculateCircleScale, draw } from '../utils/circles.js'
import '../App.css'
import cartographer from '../assets/cartographer.png'
import bass from '../sounds/diveWithout/bass.mp3'
import danceBackground from '../sounds/diveWithout/dance-background.mp3'
import percussion from '../sounds/diveWithout/percussion.mp3'
import sfx1 from '../sounds/diveWithout/sfx1.mp3'
import sfx2 from '../sounds/diveWithout/sfx2.mp3'

// const squareColour = 'rgba(255, 192, 283, 0.5)'
// const circleColour = 'rgba(201, 152, 36, 0.5)'

const Canvas = ({nose,
                 width,
                 height,
                 preset:
                 { shapeCoordinates,
                   colour,
                   pattern }}) => {
  const [preset, setPreset] = useState('diveWithout');
  const canvasRef = useRef();





  useEffect(() => {
    if (nose.length === 0) return () => {}


    const ctx = canvasRef.current.getContext('2d');

    if (preset === 'yoga') {

      const backgroundnew = document.getElementById("backgroundnew");
      backgroundnew.play()
      const cNote = document.getElementById("jingleC");
      const aNote = document.getElementById("jingleF");
      const gNote = document.getElementById("jingleG");
      const dNote = document.getElementById("jingleC2");

      const sounds = [cNote, aNote, gNote, dNote];

      const [xScale, yScale, rScale] = calculateCircleScale(width, height, shapeCoordinates[0]);
      const updatedCircleCoordinates = shapeCoordinates.map(([x, y, r]) => {
        return [x * xScale, y * yScale, r * rScale]
      })
      trackCircles(updatedCircleCoordinates, sounds, nose);
      draw(ctx, nose, updatedCircleCoordinates, sounds, pattern, colour);
    }

    else if (preset === 'diveWithout') {
      const danceBackground = document.getElementById("danceBackground");
      danceBackground.play()
      const bass = document.getElementById("bass");
      const percussion = document.getElementById("percussion");
      const sfx1 = document.getElementById("sfx1");
      const sfx2 = document.getElementById("sfx2");

      const sounds = [bass, percussion, sfx1, sfx2];

      prepareCanvasWithSquares(ctx, width, height, shapeCoordinates, colour)
      const coordinates = calculateAudioCoordinates(width, height, shapeCoordinates);
      trackSquares(coordinates, sounds, nose);

    }









  }, [nose])

  return (
    <div className="audioCanvas">
    <audio id="background-sounds" src={backgroundSounds}></audio>
    <audio id="c-note" src={cNote}></audio>
    <audio id="g-note" src={gNote}></audio>
    <audio id="d-note" src={dNote}></audio>
    <audio id="a-note" src={aNote}></audio>
    <audio id="backgroundnew" src={backgroundnew}></audio>
    <audio id="jingleC" src={jingleC}></audio>
    <audio id="jingleF" src={jingleF}></audio>
    <audio id="jingleG" src={jingleG}></audio>
    <audio id="jingleC2" src={jingleC2}></audio>

    <audio id="bass" src={bass}></audio>
    <audio id="danceBackground" src={danceBackground}></audio>
    <audio id="percussion" src={percussion}></audio>
    <audio id="sfx1" src={sfx1}></audio>
    <audio id="sfx2" src={sfx2}></audio>
    <canvas
      id="canvas"
      ref={canvasRef}
      width={width}
      height={height}
      >

      </canvas>

    </div>
  )

}

export default Canvas
