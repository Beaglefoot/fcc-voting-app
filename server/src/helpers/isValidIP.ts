const isValidIP = (ip: string): boolean =>
  !ip.split('.').some((num, _, { length }) => {
    const int = Number(num);
    return (
      length !== 4 ||
      !/\d/.test(num) ||
      int > 255 ||
      int < 0 ||
      String(int).length !== num.length
    );
  });

export default isValidIP;
