const googleLibUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`;

export const fetchGoogleLib = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = `${googleLibUrl}`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => resolve());
    script.addEventListener("error", e => reject(e));

    document.body.appendChild(script);
  });
};
