import fs from "fs";
import path from "path";

export function generateFolderStructure(dirPath: string, result: any = {}) {
  const files = fs.readdirSync(dirPath);
  result[path.basename(dirPath)] = { folders: {} };
  files.forEach((file: string) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      generateFolderStructure(filePath, result[path.basename(dirPath)].folders);
    }
  });

  fs.writeFileSync(
    "projectStructure.json",
    JSON.stringify(result, null, 2)
  );
}

