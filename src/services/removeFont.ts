import { paths } from "../constants/paths";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Função para remover fontes
export async function removeFont(fontName: string, options: any) {
  try {
    const fontDir = options.system ? paths.SYSTEM_FONT_DIR : paths.USER_FONT_DIR;

    // Verifica se o diretório existe
    if (!fs.existsSync(fontDir)) {
      console.error(`Diretório de fontes não encontrado: ${fontDir}`);
      return;
    }

    // Encontra arquivos correspondentes ao nome da fonte
    let found = false;
    const files = fs.readdirSync(fontDir, { recursive: true });

    for (const file of files) {
      const filePath = path.join(fontDir, file.toString());

      if (
        fs.statSync(filePath).isFile() &&
        file.toString().toLowerCase().includes(fontName.toLowerCase())
      ) {
        // Remove o arquivo
        fs.unlinkSync(filePath);
        console.log(`Fonte removida: ${filePath}`);
        found = true;
      }
    }

    if (!found) {
      console.log(`Fonte "${fontName}" não encontrada em ${fontDir}`);
      return;
    }

    // Atualiza o cache de fontes
    console.log("Atualizando cache de fontes...");
    if (options.system) {
      execSync("sudo fc-cache -f -v");
    } else {
      execSync("fc-cache -f -v");
    }

    console.log(`Fonte(s) "${fontName}" removida(s) com sucesso!`);
  } catch (error) {
    console.error("Erro ao remover fonte:", error);
    if (options.system) {
      console.error(
        "Talvez seja necessário executar com permissões de administrador (sudo)"
      );
    }
  }
}