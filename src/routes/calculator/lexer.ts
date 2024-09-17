export type BinaryOperand = '+' | '-' | '*' | '/';

export type BinaryOperation = (
  leftHandSide: number,
  rightHandSide: number
) => number;

export type BinaryDefinition = {
  [T in BinaryOperand]: BinaryOperation;
};

export var Number_isNaN = Number.isNaN;

type BinaryOp = '+' | '-' | '*' | '/' | '%';
type BinaryOpFunc = (lhs: number, rhs: number) => number;
enum BinaryPrec {
  PREC0 = 0,
  PREC1,
  COUNT_PRECS,
}
interface BinaryOpDef {
  func: BinaryOpFunc;
  prec: BinaryPrec;
}
type UnaryOp = '-';
type UnaryOpFunc = (arg: number) => number;
const BINARY_OPS: { [op in BinaryOp]: BinaryOpDef } = {
  '+': {
    func: (lhs, rhs) => lhs + rhs,
    prec: BinaryPrec.PREC0,
  },
  '-': {
    func: (lhs, rhs) => lhs - rhs,
    prec: BinaryPrec.PREC0,
  },
  '*': {
    func: (lhs, rhs) => lhs * rhs,
    prec: BinaryPrec.PREC1,
  },
  '/': {
    func: (lhs, rhs) => lhs / rhs,
    prec: BinaryPrec.PREC1,
  },
  '%': {
    func: (lhs, rhs) => lhs % rhs,
    prec: BinaryPrec.PREC1,
  },
};
const UNARY_OPS: { [op in UnaryOp]: UnaryOpFunc } = {
  '-': (arg: number) => -arg,
};
export type TokenSet = Set<{
  token: string;
}>;

export class Lexer {
  #src: string = '';
  #tokenSet: TokenSet = new Set();

  constructor(src: string) {
    this.#src = src;
  }

  tokenize(): TokenSet | never {
    for (var i = 0; i < this.#src.length; i++) {
      var char = this.#src[i];
      var token = char;

      switch (true) {
        case char === ' ':
        case char === '\n': {
          break;
        }

        case char === '+':
        case char === '-':
        case char === '*':
        case char === '/': {
          this.#tokenSet.add({
            token,
          });
        }

        case Number_isNaN(parseFloat(char)) === false: {
          this.#tokenSet.add({
            token,
          });
        }

        default: {
          throw new Error(`Unexpected token: "${token}"`);
        }
      }
    }

    return this.#tokenSet;
  }
}
