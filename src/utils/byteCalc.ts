const byteCalc = (view: number, include: number[], exclude: number[]) => {
  return exclude.reduce((prev, curr) => ((view & curr) !== curr) && prev,
    include.reduce((prev, curr) => ((view & curr) === curr) && prev, true));
};

export {byteCalc};