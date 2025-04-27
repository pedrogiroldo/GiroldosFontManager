import { program } from "commander";
import { installFont } from "./services/installFonts";
import fs from "fs";
import path from "path";
import { paths } from "./constants/paths";
import { removeFont } from "./services/removeFont";
import { getFontDetails } from "./services/getFontDetails";
import { updateFontCache } from "./services/updateFontCache";

// Configuração do programa
program
  .name("giroldo-font-manager")
  .description("CLI para gerenciar fontes no Linux")
  .version("0.0.1");

program
  .command("install")
  .description("Instalar uma fonte")
  .argument("<font>", "Nome da fonte")
  .option(
    "-p, --path <path>",
    "Caminho para o arquivo de fonte. Se não fornecido, procura por fontes no diretório atual"
  )
  .option("-d, --directory <directory>", "Diretório para instalar a fonte")
  .option("-s, --system", "Instalar a fonte para todo o sistema")
  .option("-u, --user", "Instalar a fonte para o usuário atual")
  .action(installFont);

program
  .command("list")
  .description("Listar fontes instaladas")
  .option("-s, --system", "Listar fontes do sistema")
  .option("-u, --user", "Listar fontes do usuário atual")
  .action((options) => {
    try {
      let fontsDir = options.system
        ? paths.SYSTEM_FONT_DIR
        : paths.USER_FONT_DIR;
      console.log(`Fontes em ${fontsDir}:`);

      if (fs.existsSync(fontsDir)) {
        const fonts = fs
          .readdirSync(fontsDir, { recursive: true })
          .filter((file: any) => {
            const fullPath = path.join(fontsDir, file.toString());
            return (
              fs.statSync(fullPath).isFile() &&
              [".ttf", ".otf", ".woff", ".woff2"].includes(
                path.extname(fullPath).toLowerCase()
              )
            );
          });

        if (fonts.length === 0) {
          console.log("Nenhuma fonte encontrada.");
        } else {
          fonts.forEach((font: any) => console.log(font.toString()));
        }
      } else {
        console.log(`Diretório ${fontsDir} não existe.`);
      }
    } catch (error) {
      console.error("Erro ao listar fontes:", error);
    }
  });

program
  .command("remove")
  .description("Remover uma fonte")
  .argument("<font>", "Nome da fonte para remover")
  .option("-s, --system", "Remover do diretório de fontes do sistema")
  .option("-u, --user", "Remover do diretório de fontes do usuário")
  .action(removeFont);

program
  .command("info")
  .description("Mostrar informações sobre uma fonte")
  .argument("<font>", "Nome da fonte")
  .option("-v, --verbose", "Mostrar informações detalhadas")
  .action(getFontDetails);

program
  .command("update-cache")
  .description("Atualizar o cache de fontes")
  .option("-s, --system", "Atualizar o cache de fontes do sistema")
  .option("-u, --user", "Atualizar o cache de fontes do usuário")
  .action(updateFontCache);

export { program };
