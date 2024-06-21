const calcSimpleInterest = (amount: number, time: number, rate: number): number => {
    return amount * rate * time;
  };
  
  const calcCompoundInterest = (amount: number, time: number, rate: number): number => {
    return amount * Math.pow((1 + rate), time) - amount;
  };