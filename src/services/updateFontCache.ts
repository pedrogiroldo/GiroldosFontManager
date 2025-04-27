import { execSync } from "child_process";

// Função para atualizar o cache de fontes
export async function updateFontCache(options: any) {
  try {
    console.log("Atualizando cache de fontes...");

    if (options.system) {
      console.log("Atualizando cache de fontes do sistema...");
      execSync("sudo fc-cache -f -v");
    } else {
      console.log("Atualizando cache de fontes do usuário...");
      execSync("fc-cache -f -v");
    }

    console.log("Cache de fontes atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar cache de fontes:", error);
  }
}

