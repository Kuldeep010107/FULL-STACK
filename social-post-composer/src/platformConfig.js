export const PLATFORMS = {
  twitter: {
    name: "Twitter / X",
    charLimit: 280,
    allowsMedia: true,
    maxMediaCount: 4,
    allowsHashtags: true,
    color: "#1DA1F2",
    icon: "X",
  },
  instagram: {
    name: "Instagram",
    charLimit: 2200,
    allowsMedia: true,
    maxMediaCount: 10,
    allowsHashtags: true,
    maxHashtags: 30,
    color: "#E1306C",
    icon: "INSTA",
  },
  linkedin: {
    name: "LinkedIn",
    charLimit: 3000,
    allowsMedia: true,
    maxMediaCount: 9,
    allowsHashtags: true,
    color: "#0077B5",
    icon: "in",
  },
  facebook: {
    name: "Facebook",
    charLimit: 63206,
    allowsMedia: true,
    maxMediaCount: 10,
    allowsHashtags: false,
    color: "#1877F2",
    icon: "f",
  },
};

export function validate(text, mediaFiles, selectedPlatforms) {
  const errors = {};
  const warnings = {};

  selectedPlatforms.forEach((pid) => {
    const p = PLATFORMS[pid];
    const platformErrors = [];
    const platformWarnings = [];

    if (text.length > p.charLimit) {
      platformErrors.push(`Exceeds character limit by ${text.length - p.charLimit}`);
    } else if (text.length > p.charLimit * 0.9) {
      platformWarnings.push(`Approaching character limit (${p.charLimit - text.length} left)`);
    }

    if (!p.allowsMedia && mediaFiles.length > 0) {
      platformErrors.push(`Media not supported`);
    } else if (p.allowsMedia && mediaFiles.length > p.maxMediaCount) {
      platformErrors.push(`Max ${p.maxMediaCount} media files allowed (${mediaFiles.length} selected)`);
    }

    const hashtags = (text.match(/#\w+/g) || []).length;
    if (!p.allowsHashtags && hashtags > 0) {
      platformWarnings.push(`Hashtags are not recommended on this platform`);
    } else if (p.maxHashtags && hashtags > p.maxHashtags) {
      platformErrors.push(`Max ${p.maxHashtags} hashtags allowed (${hashtags} used)`);
    }

    if (platformErrors.length) errors[pid] = platformErrors;
    if (platformWarnings.length) warnings[pid] = platformWarnings;
  });

  return { errors, warnings };
}
