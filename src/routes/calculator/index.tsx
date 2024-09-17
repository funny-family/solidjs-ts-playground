import { Lexer } from './lexer';

var src = '1 + 2 * 9';
var lexer = new Lexer(src);
console.log(lexer.tokenize());

// console.log(lexer, lexer.next(), lexer.next(), lexer.unnext());

export default () => {
  return <div>index</div>;
};
