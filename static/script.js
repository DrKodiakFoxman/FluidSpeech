async function playAudio() {
  const text = document.getElementById("text-input").value;
  if (!text.trim()) return alert("Please enter some text.");

  const res = await fetch("/synthesize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  if (!res.ok) return alert("Error generating audio.");

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const audio = document.getElementById("audio-player");
  audio.src = url;
  audio.style.display = "block";
  audio.play();
}

async function downloadAudio() {
  const text = document.getElementById("text-input").value;
  if (!text.trim()) return alert("Please enter some text.");

  const res = await fetch("/synthesize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  if (!res.ok) return alert("Error generating audio.");

  const blob = await res.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tts_output.wav";
  link.click();
}
