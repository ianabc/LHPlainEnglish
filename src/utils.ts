export function getRoundSize(total: number, defaultSize = 7): number {
  const param = new URLSearchParams(window.location.search).get("questions");
  const parsed = param !== null ? parseInt(param, 10) : defaultSize;
  const n = Number.isFinite(parsed) ? parsed : defaultSize;
  return Math.max(1, Math.min(n, total));
}

export function pickRandomIndices(total: number, count: number): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

export function scoreMessage(score: number, total: number): string {
  if (score === total) return "Perfect round!";
  if (score >= total * 0.8) return "Great work!";
  if (score >= total * 0.5) return "Not bad!";
  return "Keep practising!";
}
