export const getImageUrl = (path: string) => {
  // Make sure no accidental slashes at start
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/assets/${cleanPath}`;
};

export default getImageUrl;