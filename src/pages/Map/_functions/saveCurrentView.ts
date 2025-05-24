export const saveCurrentView = (coord: naver.maps.Coord) =>
  localStorage.setItem(
    "currentViewpoint",
    JSON.stringify({ x: coord.x, y: coord.y })
  );

export const getCurrentView = (): { x: string; y: string } | undefined => {
  const raw = localStorage.getItem("currentViewpoint");
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.x || !parsed.y) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
};
