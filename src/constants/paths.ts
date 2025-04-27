import path from "path";
import os from "os";

export const paths = {
  SYSTEM_FONT_DIR: "/usr/share/fonts",
  USER_FONT_DIR: path.join(os.homedir(), ".local/share/fonts"),
  TEMP_DIR: path.join(os.tmpdir(), "giroldo-font-manager"),

} as const;
