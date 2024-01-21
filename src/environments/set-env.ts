const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
// Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
// Load node modules
  const colors = require('colors');
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env'
  });
// `environment.ts` file structure, FB_API_KEY must be defined as an environment variable in the hosting server
  const envConfigFile = `export const environment = {
  firebaseApiKey: '${process.env["FB_API_KEY"]}',
  production: true,
};
`;
  console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  writeFile(targetPath, envConfigFile, (err:Error) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};

setEnv();
