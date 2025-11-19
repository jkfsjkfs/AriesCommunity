export function emitirTramiteNuevo(tramite) {
  window.dispatchEvent(new CustomEvent("tramite-nuevo", { detail: tramite }));
}
