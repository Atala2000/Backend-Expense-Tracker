const getInterest = (amount: number, rate: number, time: number) => {
  return (amount * rate * time) / 100;
}

const getTime = (endDate: Date) => {
  return endDate.getTime() - new Date().getTime();
}

const getLoanDetails = (amount: number, rate: number, time: number) => {
  const interest = getInterest(amount, rate, time);
  const totalAmount = amount + interest;
  return { amount, rate, time, interest, totalAmount };
}