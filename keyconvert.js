import fs from 'fs'
const key = fs.readFileSync('./artify-firebase-adminsdk.json', 'utf8')
const base64 = Buffer.from(key).toString('base64')
console.log(base64)