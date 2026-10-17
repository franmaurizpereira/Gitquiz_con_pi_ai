/**
 * Extensión: confirm-delete
 *
 * Pide confirmación antes de ejecutar cualquier comando bash que contenga "rm".
 * Si el usuario responde que no, el comando se bloquea y no se ejecuta.
 *
 * Ubicación: .pi/extensions/confirm-delete.ts
 * Para activarla hay que recargar las extensiones con /reload.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
	// Detecta "rm" como palabra/comando independiente.
	// El \b (límite de palabra) evita falsos positivos dentro de palabras
	// como "form", "perform" o "transform". Con "i" ignoramos mayúsculas.
	const contieneRm = /\brm\b/i;

	pi.on("tool_call", async (event, ctx) => {
		// Solo interceptamos las llamadas a la herramienta bash.
		if (event.toolName !== "bash") return undefined;

		// Texto del comando que se pretende ejecutar.
		const comando = String(event.input.command ?? "");

		// Si no contiene "rm", dejamos pasar el comando sin preguntar.
		if (!contieneRm.test(comando)) return undefined;

		// En modos sin interfaz (RPC/JSON/print) no se puede preguntar:
		// bloqueamos por seguridad en lugar de ejecutar a ciegas.
		if (!ctx.hasUI) {
			return {
				block: true,
				reason: "Comando con 'rm' bloqueado: no hay interfaz para pedir confirmación.",
			};
		}

		// Pedimos confirmación al usuario mostrando el comando completo.
		const permitido = await ctx.ui.confirm(
			"⚠️ Comando con 'rm'",
			`Se va a ejecutar:\n\n  ${comando}\n\n¿Permitir?`,
		);

		// Si el usuario dice que no, bloqueamos la ejecución.
		if (!permitido) {
			ctx.ui.notify("Comando bloqueado por el usuario", "warning");
			return { block: true, reason: "El usuario no autorizó un comando con 'rm'." };
		}

		// Si autoriza, devolvemos undefined para que el comando continúe.
		return undefined;
	});
}
