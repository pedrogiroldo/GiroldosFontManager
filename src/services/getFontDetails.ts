import { execSync } from "child_process";

// Função para obter detalhes de uma fonte
export async function getFontDetails(fontName: string, options: any) {
  try {
    console.log(`Buscando detalhes da fonte: ${fontName}`);

    // Usa fc-list para encontrar a fonte
    const fontInfo = execSync(`fc-list | grep -i "${fontName}"`, {
      encoding: "utf8",
    });

    if (!fontInfo.trim()) {
      console.log(`Fonte "${fontName}" não encontrada no sistema.`);
      return;
    }

    console.log("Detalhes da fonte:");
    console.log(fontInfo);

    // Se especificado, obtém informações mais detalhadas usando fc-query
    if (options.verbose) {
      const fontLines = fontInfo.split("\n").filter(Boolean);
      for (const line of fontLines) {
        const fontPath = line.split(":")[0];
        if (fontPath) {
          console.log("\nInformações detalhadas:");
          try {
            const details = execSync(`fc-query "${fontPath}"`, {
              encoding: "utf8",
            });
            console.log(details);
          } catch (err) {
            console.log(
              `Não foi possível obter detalhes avançados para ${fontPath}`
            );
          }
        }
      }
    }
  } catch (error) {
    console.error("Erro ao obter detalhes da fonte:", error);
  }
}