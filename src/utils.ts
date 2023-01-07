const parseArgs = () => {
  const args = process.argv;
  const result: { [key: string]: string } = {};

  for (let i = 2; i < process.argv.length; i += 2) {
    result[`${args[i].slice(2)}`] = args[i + 1];
  }

  return result;
};

export { parseArgs };
