
import React from "react";
import * as Tone from "tone";

export default function App() {

// Set the BPM
Tone.Transport.bpm.value = 20;

// Effects
const pingPong = new Tone.PingPongDelay("4n", .1).toDestination();
const reverb = new Tone.Freeverb(.5, .5, 0.101).toDestination();
const tremolo = new Tone.Tremolo(9, 0.02).toDestination().start(1);

// Synth Sound 1
  const synth = new Tone.MonoSynth({
    volume: -18,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: .5,
      decay: 1,
      sustain: 0.5,
      release: 10
    },
    filterEnvelope: {
      attack: 0.06,
      decay: 0.2,
      sustain: 0.5,
      release: 2,
      baseFrequency: 200,
      octaves: 7,
      exponent: 1.2
    }
  }).chain(tremolo, pingPong).toDestination();

  // Synth Sound 2
  const synthTwo = new Tone.MonoSynth({
    volume: -20,
    oscillator: {
      type: 'triangle'
    },
    envelope: {
      attack: .9,
      decay: 1,
      sustain: 0.9,
      release: 40
    },
    filterEnvelope: {
      attack: 0.06,
      decay: 0.2,
      sustain: 0.5,
      release: 2,
      baseFrequency: 200,
      octaves: 7,
      exponent: 1.2
    }
  }).chain(reverb).toDestination();

// Pattern 1
var  pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, "4n");
    }, ["C4", "D4", "F4", "G4", "B4"], "upDown");
  pattern.loop = true;
  pattern.interval = "4n";

function playSequence(){
   Tone.Transport.start();
   pattern.start(0);
}

// Pattern 2
var  patternTwo = new Tone.Pattern(function(time, note){
  synthTwo.triggerAttackRelease(note, "2n");
    }, ["C2", "D2", "E2", "A2"], "downUp");
    patternTwo.loop = true;
    patternTwo.interval = "1n";

    function playSequenceTwo(){
      Tone.Transport.start();
      patternTwo.start(0);
    }

// Play note function
  function playNote(note) {
    synth.triggerAttackRelease(`${note}`, "8n");
  }


  return (
    <div className="App">
      <h1>Schema47</h1>
      <div className="note-wrapper">
        <button className="note" onClick={() => playSequence()}>
          C
        </button>
        <button className="note" onClick={() => playSequenceTwo()}>
          D
        </button>
        <button className="note" onClick={() => playNote("F#5")}>
          F#
        </button>
        <button className="note" onClick={() => playNote("G4")}>
          G
        </button>
        <button className="note" onClick={() => playNote("Bb3")}>
          Bb
        </button>
      </div>
    </div>
  );
}
