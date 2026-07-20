import { useState, useMemo } from "react";
import { validate } from "../platformConfig";
import PlatformSelector from "./PlatformSelector";
import CharCounter from "./CharCounter";
import MediaUploader from "./MediaUploader";
import ValidationPanel from "./ValidationPanel";
import "./PostComposer.css";

export default function PostComposer() {
  const [text, setText] = useState(() => localStorage.getItem("draft_text") || "");
  const [platforms, setPlatforms] = useState(() => JSON.parse(localStorage.getItem("draft_platforms") || "[]"));
  const [media, setMedia] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
    localStorage.setItem("draft_text", e.target.value);
  };

  const handlePlatformChange = (val) => {
    setPlatforms(val);
    localStorage.setItem("draft_platforms", JSON.stringify(val));
  };

  const { errors, warnings } = useMemo(
    () => validate(text, media, platforms),
    [text, media, platforms]
  );

  const hasErrors = Object.keys(errors).length > 0;
  const canPost = platforms.length > 0 && text.trim().length > 0 && !hasErrors;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canPost) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setText("");
      setMedia([]);
      setPlatforms([]);
      localStorage.removeItem("draft_text");
      localStorage.removeItem("draft_platforms");
    }, 2500);
  };

  return (
    <div className="composer-card">
      <h2 className="composer-title"> Create Post</h2>
      <form onSubmit={handleSubmit}>
        <PlatformSelector selected={platforms} onChange={handlePlatformChange} />

        <div className="field-group">
          <label className="field-label">Content</label>
          <textarea
            className="composer-textarea"
            placeholder="What's on your mind?"
            value={text}
            onChange={handleTextChange}
            rows={5}
          />
          <CharCounter text={text} selectedPlatforms={platforms} />
        </div>

        <MediaUploader files={media} onChange={setMedia} />

        <ValidationPanel errors={errors} warnings={warnings} />

        {submitted && (
          <div className="success-banner">✅ Post published successfully!</div>
        )}

        <button
          type="submit"
          className="post-btn"
          disabled={!canPost}
        >
          {platforms.length === 0
            ? "Select a platform to post"
            : hasErrors
            ? "Fix errors to post"
            : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
