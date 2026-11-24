import { useState } from "react";

export default function OcrUploader() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setLoading(true);
    const form = new FormData();
    form.append("file", e.target.files[0]);

    try {
      const resp = await fetch("/api/v1/ocr/extract", {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      setResult(data.text);
    } catch (err) {
      console.error(err);
      setResult("Error processing image.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white/10 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload Document Image (OCR)</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p className="mt-2 text-amber-600">Processing…</p>}
      {result && (
        <pre className="mt-4 p-2 bg-slate-800/60 text-white rounded whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  );
}
