type AlowedCodes = '000' | '001' | '010' | '100' | '011' | '101' | '110' | '111';
export type Code = `${AlowedCodes}-${AlowedCodes}-${AlowedCodes}`;

const binaryToDecimal = (binaryNumberString: string) => {
  const decimalNumber = parseInt(binaryNumberString, 2);

  return String(decimalNumber);
};

export function codeToDecimal(code: Code) {
  const binaryCodes = code.split('-');

  return binaryCodes.map(binaryToDecimal).join('');
}
