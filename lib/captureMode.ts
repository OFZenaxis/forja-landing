/**
 * Modo captura: ?capture=1 na URL desliga os loops decorativos baseados em
 * tempo (float contínuo dos mockups e equivalentes) para que a captura por
 * screenshots frame a frame seja determinística. NÃO afeta nada acionado por
 * scroll (pin, fades), pelas partículas ou pelos estados do app — só os loops
 * infinitos que não dependem da posição de scroll.
 *
 * Não altera nada para visitantes normais (só age quando o param está presente).
 */
export function isCaptureMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("capture");
}
