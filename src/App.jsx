import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import VolumeDown from "@mui/icons-material/VolumeDown";
import Slider from "@mui/material/Slider";
import VolumeUp from "@mui/icons-material/VolumeUp";
import "./App.scss";
import { useState, useEffect } from "react";

function App() {
  const [pad] = useState([
    {
      id: 1,
      name: "Heater-1",
      key: "Q",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      id: 2,
      name: "Heater-2",
      key: "W",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      id: 3,
      name: "Heater-3",
      key: "E",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      id: 4,
      name: "Heater-4",
      key: "A",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      id: 5,
      name: "Clap",
      key: "S",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      id: 6,
      name: "Open-HH",
      key: "D",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      id: 7,
      name: "Kick-n'-Hat",
      key: "Z",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      id: 8,
      name: "Kick",
      key: "X",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      id: 9,
      name: "Closed-HH",
      key: "C",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ]);

  const [songName, setSongName] = useState("");
  const [volume, setVolume] = useState(30);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);
  });

  const handleClick = (key, name) => {
    const padClicked = document.getElementById(key);
    if (checked) {
      padClicked.volume = volume / 100;
    } else {
      padClicked.volume = 0;
    }
    padClicked.style.border = "4px solid orangered";
    padClicked.play();
    setSongName(name);
  };

  const handleKeyDown = (event) => {
    const padClicked = pad.find((item) => item.key === event.key.toUpperCase());
    if (padClicked) {
      const keyPressed = document.getElementById(padClicked.key);
      if (checked) {
        keyPressed.volume = volume / 100;
      } else {
        keyPressed.volume = 0;
      }

      keyPressed.play();
      setSongName(padClicked.name);
      document.getElementById(padClicked.name).style.border =
        "4px solid orangered";
      setTimeout(() => {
        document.getElementById(padClicked.name).style.border = "";
      }, 100);
    }
  };

  const handleOnOff = (event) => {
    setChecked(event.target.checked);
  };

  const handleVolume = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div className="outer-container">
      <h1>
        <MusicNoteIcon fontSize="extralarge">Drum Machine</MusicNoteIcon>Drum
        Machine
      </h1>

      <div id="drum-machine" className="container">
        <div id="display">{songName}</div>
        <div id="pad-group">
          {pad.map((pad) => {
            return (
              <button
                id={pad.name}
                className="drum-pad"
                key={pad.id}
                onClick={() => handleClick(pad.key, pad.name)}
              >
                <audio id={pad.key} className="clip" src={pad.url}></audio>
                {pad.key}
              </button>
            );
          })}
        </div>
        <div id="controls">
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleOnOff} />}
            label="POWER ON"
          />
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown fontSize="large" />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleVolume}
            />
            <VolumeUp fontSize="large" />
          </Stack>
        </div>
      </div>
      <span className="logo">BlackCoder</span>
    </div>
  );
}

export default App;
