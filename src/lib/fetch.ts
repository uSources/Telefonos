export function fetchWith<R = unknown>(
  path: string,
  options: RequestInit = {}
) {
  console.log("⏳ Enviando solicitud a:", path);

  return fetch(new URL(path, process.env.API_URL || "http://localhost:3000"), {
    ...options,
    headers: new Headers({
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY || "",
      ...Object.fromEntries(new Headers(options.headers || {})),
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`❌ Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Respuesta recibida:", data);
      return data as R;
    })
    .catch((error) => {
      console.error("❗ Error en fetch:", error);
      throw error;
    });
}
