
import React from "react";
import * as Tone from "tone";

export default function App() {

// Set the BPM
Tone.Transport.bpm.value = 20;

// Effects
const pingPong = new Tone.PingPongDelay("16n", .03).toDestination();
const reverb = new Tone.Freeverb(.5, .5, 0.101).toDestination();
const tremolo = new Tone.Tremolo(9, 0.02).toDestination().start(1);
const chorus = new Tone.Chorus(4, 2.5, 0.7).toDestination().start();


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
  const synthTwo = new Tone.PolySynth({
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

  // Synth Sound 3
  const synthThree = new Tone.PolySynth({
    "volume": -40,
    "detune": 10,
    "portamento": 10,
    "envelope": {
      "attack": 0.005,
      "attackCurve": "linear",
      "decay": 0.01,
      "decayCurve": "exponential",
      "release": .5,
      "releaseCurve": "exponential",
      "sustain": 0.01
    },
    "oscillator": {
      "partialCount": 101,
      "partials": [
        0.8105694691387023,
        0,
        -0.0900632743487447,
        0,
        0.03242277876554809,
        0,
        -0.016542234064055146,
        0,
        0.010007030483193857,
        0,
        -0.00669892123255126,
        0,
        0.004796269048158,
        0,
        -0.0036025309739497885,
        0,
        0.0028047386475387615,
        0,
        -0.002245344789857901,
        0,
        0.0018380260071172384,
        0,
        -0.0015322674274833694,
        0,
        0.0012969111506219236,
        0,
        -0.0011118922759104286,
        0,
        0.0009638162534348421,
        0,
        -0.0008434645880735718,
        0,
        0.0007443245813945843,
        0,
        -0.000661689362562206,
        0,
        0.0005920887283701257,
        0,
        -0.0005329187831286668,
        0,
        0.00048219480615032865,
        0,
        -0.00043838262257366267,
        0,
        0.00040028121932775414,
        0,
        -0.0003669395514435048,
        0,
        0.0003375966135521459,
        0,
        -0.0003116376275043069,
        0,
        0.0002885615767670709,
        0,
        -0.0002679568493020503,
        0,
        0.0002494827544286557,
        0,
        -0.00023285534879020466,
        0,
        0.0002178364603973938,
        0,
        -0.0002042251119019154,
        0,
        0.0001918507619263201,
        0,
        -0.00018056793698790425,
        0,
        0.000170251936387041,
        0,
        -0.00016079537177915142,
        0,
        0.00015210536106937555,
        0,
        -0.00014410123895799155,
        0,
        0.0001367126782153318,
        0,
        -0.00012987813958319216,
        0,
        0.00012354358621226983,
        0,
        -0.00011766141227154916,
        0,
        0.00011218954590155046,
        0,
        -0.00010709069482609357,
        0,
        0.00010233170927139278,
        0,
        -0.00009788304179914288,
        0,
        0.00009371828756373018,
        0,
        -0.00008981379159431603,
        0,
        0.00008614831216268492,
        0,
        -0.00008270273126606491,
        0,
        0.0000794598048366535
      ],
      "phase": 29.999999999999996,
      "type": "triangle101"
    }
  }).chain(pingPong, chorus).toDestination();

// Pattern 1
var  pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, "4n");
    }, [
    "C4", "D4", "F4", "G4", "B4",
    "C4", "D4", "F4", "G4", "B4",
    "F4", "G4", "B4", "C4", "D4",
    "F4", "G4", "B4", "C4", "D4"], "upDown");
  pattern.loop = true;
  pattern.interval = "4n";

function playSequence(){
   Tone.Transport.start();
   pattern.start(0);
}

// Pattern 2
var  patternTwo = new Tone.Pattern(function(time, note){
  synthTwo.triggerAttackRelease(note, "1n");
    }, [["C2", "E1"], "D2", "E2", "A2"], "downUp");
    patternTwo.loop = true;
    patternTwo.interval = "1n";

    function playSequenceTwo(){
      Tone.Transport.start();
      patternTwo.start(0);
    }


// Pattern 3
var  patternThree = new Tone.Pattern(function(time, note){
  synthThree.triggerAttackRelease(note, "128n");
    }, [
      "C6", "B5", "G5", "F5",
      "C6", "B5", "G5", "F5",
      "C6", "B5", "G5", "F5",
      "C6", "B5", "G5", "F5",
      "G5", "F5", "D5", "C5",
      "G5", "F5", "D5", "C5",
      "G5", "F5", "D5", "C5",
      "G5", "F5", "D5", "C5",
      "E6", "D6", "C6", "G5",
      "E6", "D6", "C6", "G5",
      "E6", "D6", "C6", "G5",
      "E6", "D6", "C6", "G5",
  ], "upDown");
    patternThree.loop = true;
    patternThree.interval = "32n";

    function playSequenceThree(){
      Tone.Transport.start();
      patternThree.start(0);
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
          1
        </button>
        <button className="note" onClick={() => playSequenceTwo()}>
          2
        </button>
        <button className="note" onClick={() => playSequenceThree()}>
          3
        </button>
       

      </div>
    </div>
  );
}
