
import React from "react";
import * as Tone from "tone";

export default function App() {

// Variables
var lightSpectrum = 20;
var pressure = 19;
var temperature = 23;

// var lightIntensity = 3;
// var soundLevels = 3;
// var humidity = 3;

// Set the BPM
Tone.Transport.bpm.value = temperature;

// Effects
const pingPong = new Tone.PingPongDelay(
  (pressure <= 20) ? "4n" : "1n", 
  (pressure <= 20) ? ".1" : ".9").toDestination();

const pingPongBig = new Tone.PingPongDelay("16n", .5).toDestination();

const reverb = new Tone.Freeverb(.9, .5, 0.5).toDestination();

const tremolo = new Tone.Tremolo(9, 0.02).toDestination().start(1);
const tremoloDeep = new Tone.Tremolo(12, 0.9).toDestination().start(1);

const chorus = new Tone.Chorus(4, 2.5, 0.7).toDestination().start();

// Synth Sound 1
  const synth = new Tone.MonoSynth({
    volume: -40,
    oscillator: { type: (lightSpectrum >= 20) ? "sine" : "sawtooth"
    },
    envelope: {
      attack: 1.9,
      decay: 1,
      sustain: 0.5,
      release: 20
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
  const synthTwo = new Tone.PolySynth({
    volume: -20,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: .9,
      decay: 1,
      sustain: 2,
      release: 70
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

  // Synth Sound 1
  const synthThree = new Tone.MonoSynth({
    volume: -35,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: .9,
      decay: 1,
      sustain: 0.5,
      release: 30
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
  }).chain(tremoloDeep, pingPongBig, reverb).toDestination();



// Pattern 1
var  pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, "4n");
    }, [
    "C4", "D4", "F4", "G4", "B4",
    "C4", "D4", "F4", "G4", "B4",
    "F4", "G4", "B4", "C4", "D4",
    "F4", "G4", "B4", "C4", "D4"], "random");
  pattern.loop = true;
  pattern.interval = "4n";

function playSequence(){
   Tone.Transport.start();
   pattern.start(0);
}

// Pattern 2
var  patternTwo = new Tone.Pattern(function(time, note){
  synthTwo.triggerAttackRelease(note, "1n");
    }, [["C2", "E1"], "D2", "E2", "A2"], "alternateUp");
    patternTwo.loop = true;
    patternTwo.interval = "1n";

    function playSequenceTwo(){
      Tone.Transport.start();
      patternTwo.start(0);
    }


// Pattern 3
var  patternThree = new Tone.Sequence(function(time, note){
  synthThree.triggerAttackRelease(note, "1n");
    }, 
    ["C6", "B5", "G5", "F5",
    ["E5", "B5", "G5", "F5"],
    "C5", "B4", "G4", "F4",
    "C6", [["B5", "G5"]], "F5",
    "G4", "F4", "D4", "C4", 
    "C4", "C4", "F4", "F4", 
    "C5", ["D5", "F5", "G5"],
    "G4", "F4", ["D4", "C4"],
    ["E5", "D5", "C5", "G4"],
    "E5", ["D5", "C5"], "G4",
    "G5", "C5", "D5", "E4",
    ["E5", "D5", "C5", "G4"],
    "G4", "F4", ["D4", "C4"],
    "E5", ["D5", "C5"], "G4",
    "G4", ["F4", "D4", "C4"], 
    "E5", ["D5", "C5"], "G4",
    "G5", ["C5", "D5", "E4"],
    "C4", "C4", "F4", "F4", 
    "C5", ["D5", "F5", "G5"],
    ], "8n");
    patternThree.loop = true;
    patternThree.interval = "9n";

    function playSequenceThree(){
      Tone.Transport.start();
      patternThree.start("8n");
    }




  return (
    <div className="App">
      <h1>schemaSynth</h1>
      <div className="note-wrapper">
        <button className="note" onClick={() => {
          Tone.start();
          playSequence(); 
          playSequenceTwo(); 
          playSequenceThree(); 
          }}>
          play
        </button>
      </div>
    </div>
  );
}
