import path from 'path';
import exec from '@simplyhexagonal/exec';
import { program } from 'commander';
import fs from 'fs';

async function main() {
  program.argument('<new_version>', 'New version to publish');

  program.parse(process.argv);

  const options = program.opts();
  console.log(options);
  const packageJsonPath = path.resolve('package.json');
  const packageJson = await import(packageJsonPath);
  const { execPromise } = exec(`npm view ${packageJson.name} version`);
  const execResult = await execPromise;
  if (execResult.exitCode !== 0) {
    throw new Error(execResult.stderrOutput.trim());
  }
  const latestVersion = execResult.stdoutOutput.toString().trim();
  const packageJsonVersion = packageJson.version;
  const newVersion = options.version || 'patch';
  if (latestVersion > packageJsonVersion) {
    throw new Error(
      `Version ${packageJson.version} in ${packageJsonPath} is outdated. Latest version in npm is ${latestVersion}. Execute npm run npm-pull`
    );
  }
  if (latestVersion === packageJsonVersion) {
    await execWrapped({command: `npm version --allow-same-version ${newVersion}`})
    await updateDeepJsonVersion({ version: newVersion });
  }
  if (latestVersion < packageJsonVersion) {
    await execWrapped({command: `npm version ${packageJsonVersion}`})
    await updateDeepJsonVersion({ version: newVersion });
  }
}

async function updateDeepJsonVersion({ version }) {
  const deepPackage = await import('../deep.json');
  deepPackage.package.version = version;

  fs.writeFileSync(
    path.resolve('deep.json'),
    JSON.stringify(deepPackage, null, 2),
    'utf-8'
  );
}

async function execWrapped({command}: {command: string}) {
  const { execPromise } = exec(command);
    const execResult = await execPromise;
    if (execResult.exitCode !== 0) {
      throw new Error(execResult.stderrOutput);
    }
    console.log(execResult.stdoutOutput);
}

main();