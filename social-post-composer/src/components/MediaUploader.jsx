import { useRef } from "react";
import "./MediaUploader.css";

export default function MediaUploader({ files, onChange }) {
  const inputRef = useRef();

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files);
    onChange([...files, ...newFiles]);
    e.target.value = "";
  };

  const remove = (idx) => onChange(files.filter((_, i) => i !== idx));

  return (
    <div className="media-uploader">
      <label className="field-label">Media</label>
      <div className="media-preview">
        {files.map((f, i) => (
          <div key={i} className="media-thumb">
            {f.type.startsWith("image/") ? (
              <img src={URL.createObjectURL(f)} alt={f.name} />
            ) : (
              <div className="media-file-icon">🎬<span>{f.name}</span></div>
            )}
            <button type="button" className="remove-btn" onClick={() => remove(i)}>✕</button>
          </div>
        ))}
        <button type="button" className="add-media-btn" onClick={() => inputRef.current.click()}>
          + Add Media
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*,video/*" multiple hidden onChange={handleFiles} />
    </div>
  );
}
