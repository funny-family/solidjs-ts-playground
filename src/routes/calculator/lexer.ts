export type BinaryOperand = '+' | '-' | '*' | '/';

export type BinaryOperation = (
  leftHandSide: number,
  rightHandSide: number
) => number;

export type BinaryDefinition = {
  [T in BinaryOperand]: BinaryOperation;
};

export var Number_isNaN = Number.isNaN;

export var BINARY_OPERATOR = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLE: '*',
  DIVIDE: '/',
} as const;

export var BINARY_OPERATORS_RECORD: {
  [T in BinaryOperand]: {
    calculate: (a: number, b: number) => number;
    precedence: number;
  };
} = {
  [BINARY_OPERATOR.PLUS]: {
    calculate: (a, b) => a + b,
    precedence: 0,
  },
  [BINARY_OPERATOR.MINUS]: {
    calculate: (a, b) => a - b,
    precedence: 0,
  },
  [BINARY_OPERATOR.MULTIPLE]: {
    calculate: (a, b) => a * b,
    precedence: 1,
  },
  [BINARY_OPERATOR.DIVIDE]: {
    calculate: (a, b) => a / b,
    precedence: 1,
  },
};

export type TokenSet = Set<any>;

export var TOKEN_TYPE = {
  NUMBER: 0,
  BINARY_OPERATION: 1,
};

export class Lexer {
  #src: string = '';
  #tokenSet: TokenSet = new Set();

  constructor(src: string) {
    this.#src = src;
  }

  tokenize(): TokenSet | never {
    loop: for (var i = 0; i < this.#src.length; i++) {
      var char = this.#src[i];
      var token = char;
      var type = TOKEN_TYPE.NUMBER;
      var value = null;
      var possibleNumber = parseFloat(char);

      switch (true) {
        case char === ' ':
        case char === '\n': {
          continue loop;
        }

        case char === '+':
        case char === '-':
        case char === '*':
        case char === '/': {
          type = TOKEN_TYPE.BINARY_OPERATION;
          this.#tokenSet.add({
            type,
            token,
            value,
          });

          continue loop;
        }

        case Number_isNaN(possibleNumber) === false: {
          value = possibleNumber;
          this.#tokenSet.add({
            type,
            token,
            value,
          });

          continue loop;
        }

        default: {
          throw new Error(`Unexpected token: "${token}"`);
        }
      }
    }

    return this.#tokenSet;
  }
}
