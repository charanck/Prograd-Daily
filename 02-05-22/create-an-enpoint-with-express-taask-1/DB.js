import fs, { fdatasync } from 'fs';

export let DB = JSON.parse(fs.readFileSync('./DB.json'));

export function DBSave(){
    fs.writeFileSync("./DB.json",JSON.stringify(DB));
}
