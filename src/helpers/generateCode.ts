module.exports  = function generate(name: string): string {
  let code: string = "";
  let nb: number = 0;
  for (let i = 0; i < name.length; i += 1) {
    nb = charcode(name.charCodeAt(i));
    code += String.fromCharCode(nb);
  }
  return code;
};

const rand = function(n: number): number {
  return Math.floor(n * (10 * Math.random()) % 90);
};

const charcode = function(c: number): number {
  c = rand(c);
  return c > 48 && c < 90 ? c : charcode(c + 1);
};
