function normalizeLabel(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function extractRankCode(value) {
  const label = normalizeLabel(value);
  if (!label) return "";

  const match = label.match(/([ក-អA-Za-z]+(?:\s*\.\s*[0-9០-៩A-Za-z]+)+)/u);
  return match ? match[1].replace(/\s*\.\s*/g, ".") : "";
}

function extractRankTitle(value) {
  const label = normalizeLabel(value);
  if (!label) return "";

  const code = extractRankCode(label);
  let title = code && label.startsWith(code) ? label.slice(code.length).trim() : label;

  title = title.replace(/^[-:,.;\/\s]+/u, "").trim();

  if (
    (title.startsWith("(") && title.endsWith(")")) ||
    (title.startsWith("（") && title.endsWith("）"))
  ) {
    title = title.slice(1, -1).trim();
  }

  if (!title || title === code) return "";
  return title;
}

export function formatRankCodeLabel(rank) {
  if (!rank) return "";

  if (typeof rank === "string") {
    const code = extractRankCode(rank);
    return code || normalizeLabel(rank);
  }

  const code = [rank?.krobkhan, rank?.rank, rank?.thnak]
    .map(normalizeLabel)
    .filter((part) => part !== "")
    .join(".");

  if (code) return code;

  return (
    extractRankCode(rank?.name) ||
    extractRankCode(rank?.desp) ||
    extractRankCode(rank?.krobkhan_name) ||
    normalizeLabel(rank?.name || rank?.desp || rank?.title || rank?.label || rank?.krobkhan_name || rank?.ank)
  );
}
