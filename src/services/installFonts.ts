import fs from "fs";
import { paths } from "../constants/paths";
import path from "path";
import { execSync } from "child_process";

// Função para checar se um arquivo é uma fonte válida
function isFontFile(filePath: string): boolean {
  const fontExtensions = [".ttf", ".otf", ".woff", ".woff2", ".eot", ".svg"];
  const ext = path.extname(filePath).toLowerCase();
  return fontExtensions.includes(ext);
}

// Função para encontrar arquivos de fonte em um diretório
function findFontFiles(directory: string): string[] {
  try {
    const files = fs.readdirSync(directory);
    const fontFiles: string[] = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Recursivamente procura em subdiretórios
        const subDirFonts = findFontFiles(filePath);
        fontFiles.push(...subDirFonts);
      } else if (isFontFile(filePath)) {
        fontFiles.push(filePath);
      }
    }

    return fontFiles;
  } catch (error) {
    console.error(`Erro ao ler diretório ${directory}:`, error);
    return [];
  }
}

// Função para instalar uma única fonte
async function installSingleFont(
  fontPath: string,
  targetDir: string,
  systemMode: boolean
): Promise<boolean> {
  try {
    // Nome do arquivo de fonte
    const fontFileName = path.basename(fontPath);
    const targetPath = path.join(targetDir, fontFileName);

    // Copia o arquivo
    fs.copyFileSync(fontPath, targetPath);
    console.log(`Fonte instalada em: ${targetPath}`);
    return true;
  } catch (error) {
    console.error(`Erro ao instalar fonte ${fontPath}:`, error);
    return false;
  }
}

export async function installFont(font: string, options: any) {
  try {
    let fontPaths: string[] = [];

    // Verifica se o arquivo de fonte existe
    if (options.path) {
      if (!fs.existsSync(options.path)) {
        console.error(`Arquivo de fonte não encontrado: ${options.path}`);
        return;
      }
      fontPaths = [options.path];
    } else {
      // Se não foi especificado um caminho, procura na pasta atual
      console.log("Procurando arquivos de fonte na pasta atual...");
      const currentDir = process.cwd();
      fontPaths = findFontFiles(currentDir);

      if (fontPaths.length === 0) {
        console.error("Nenhum arquivo de fonte encontrado na pasta atual.");
        return;
      }

      console.log(`Encontrados ${fontPaths.length} arquivos de fonte.`);
    }

    // Define o diretório de instalação
    let targetDir: string;
    if (options.directory) {
      targetDir = options.directory;
    } else if (options.system) {
      targetDir = paths.SYSTEM_FONT_DIR;
    } else {
      // Padrão para instalação por usuário
      targetDir = paths.USER_FONT_DIR;
    }

    // Cria o diretório se não existir
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Diretório criado: ${targetDir}`);
    }

    // Instala todas as fontes encontradas
    let installedCount = 0;
    for (const fontPath of fontPaths) {
      const success = await installSingleFont(
        fontPath,
        targetDir,
        !!options.system
      );
      if (success) {
        installedCount++;
      }
    }

    if (installedCount > 0) {
      // Atualiza o cache de fontes
      console.log("Atualizando cache de fontes...");
      if (options.system) {
        execSync("sudo fc-cache -f -v");
      } else {
        execSync("fc-cache -f -v");
      }

      console.log(`${installedCount} fonte(s) instalada(s) com sucesso!`);
    } else {
      console.log("Nenhuma fonte foi instalada.");
    }
  } catch (error) {
    console.error("Erro ao instalar fonte(s):", error);
    if (options.system) {
      console.error(
        "Talvez seja necessário executar com permissões de administrador (sudo)"
      );
    }
  }
}
