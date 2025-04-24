import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import logo from "./TSTCLogo-Primary2C.png";

export default function App() {
  const [text, setText] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [speakers, setSpeakers] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSpeakers([
      { id: "p225", name: "Claire (F, Southern English)" },
      { id: "p226", name: "John (M, Northern English)" },
      { id: "p227", name: "Emily (F, Scottish)" },
      { id: "p228", name: "Billy (M, Irish)" },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !speaker) return;
    setLoading(true);
    setAudioUrl(null);
    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("speaker", speaker);

// after
      const response = await axios.post(
          "/synthesize",
          formData,
          { responseType: "blob" }
      );


      setAudioUrl(URL.createObjectURL(response.data));
    } catch (err) {
      console.error("Synthesis error:", err);
      alert("Something went wrong while generating the audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="app-container">
        <img src={logo} alt="TSTC Logo" className="app-logo" />
        <h1 className="app-title">Lynacon TTS</h1>
        <form onSubmit={handleSubmit}>
        <textarea
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
        />
          <select
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
          >
            <option value="">Select a voice</option>
            {speakers.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Synthesizing..." : "Generate Audio"}
          </button>
        </form>
        {audioUrl && (
            <div className="playback">
              <h2>Playback:</h2>
              <audio controls src={audioUrl} />
            </div>
        )}
      </div>
  );
}
