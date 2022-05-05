import React, { useState } from 'react';

type NumberProps = {
  num: number;
  handleNumberClick: (id: number) => void;
};

const Number = ({ num, handleNumberClick }: NumberProps): JSX.Element => {
  return (
    <div className="number" onClick={() => handleNumberClick(num)}>
      {num}
    </div>
  );
};

type OperationProps = {
  sign: string;
  handleOperationClick: (id: string) => void;
};

const Operation = ({ sign, handleOperationClick }: OperationProps) => {
  return (
    <div className="operation" onClick={() => handleOperationClick(sign)}>
      {sign}
    </div>
  );
};

export const AppContainer = () => {
  const [operand, setOperand] = useState<number | ''>();

  const [operands, setOperands] = useState<number[] | []>([]);

  const [operations, setOperations] = useState<string[] | []>([]);

  const [result, setResult] = useState<number | undefined>();

  const handleNumberClick = (num: number) => {
    if (operand) {
      setOperand(+`${operand}${num}`);
    } else {
      setOperand(num);
    }
  };

  const handleOperationClick = (num: string) => {
    if (!operand) {
      return;
    }
    if (num === '=') {
      const result = operands.reduce((acc, current, index) => {
        const value = eval(`${current} ${operations[index]} ${operand}`);
        return acc + parseInt(value);
      }, 0 as number);
      setResult(result);
      setOperations([...operations, num]);
      return;
    }
    setOperands([...operands, operand]);
    setOperations([...operations, num]);
    setOperand('');
  };

  const getEquation = () => {
    const equation = operands.map((operand, index) => {
      return `${operand} ${operations[index]}`;
    });
    console.log(equation);
    return `${equation.join('')} ${operand || ''}`;
  };

  return (
    <div className="app-container">
      <div className="display-container">
        <div>{getEquation()}</div>
        <div>{result}</div>
      </div>
      <div className="number-container">
        {[1, 2, 3].map((num) => {
          return <Number num={num} handleNumberClick={handleNumberClick} />;
        })}
      </div>
      <div className="number-container">
        {[4, 5, 6].map((num) => {
          return <Number num={num} handleNumberClick={handleNumberClick} />;
        })}
      </div>
      <div className="number-container">
        {[7, 8, 9].map((num) => {
          return <Number num={num} handleNumberClick={handleNumberClick} />;
        })}
      </div>

      <div className="number-container">
        <Number num={0} handleNumberClick={handleNumberClick} />
      </div>

      <div className="operation-container">
        {['+', '*', '-', '='].map((sign) => {
          return (
            <Operation
              sign={sign}
              handleOperationClick={handleOperationClick}
            />
          );
        })}
        <Operation sign={'C'} handleOperationClick={handleOperationClick} />
      </div>
    </div>
  );
};
