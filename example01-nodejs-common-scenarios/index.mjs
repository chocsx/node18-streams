
const stdin = process.stdin
  .on('data', msg => console.log('terminal input was', msg))

const stdout = process.stdout
  .on('data', msg => process.stdout.write(msg.toString().toUpperCase()))

stdin.pipe(stdout)