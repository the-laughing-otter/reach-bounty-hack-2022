'reach 0.1';

const Common = {
  ...hasRandom,
  informTimeout: Fun([], Null),
  seeTransfer: Fun([], Null),
  Task1: Bytes(128),
  Task2: Bytes(128),
  Task3: Bytes(128),
  Task04: Bytes(128),
  Task5: Bytes(128),
  Task6: Bytes(128),
  Task7: Bytes(128), 

};

export const main = Reach.App(() => {
  const A = Participant('Alice', {
    ...Common,
  reward: UInt,
  payment: UInt, 
  deadline: UInt,
  });

  const B = Participant('Bob', {
    ...Common,
    accchallenge: Fun([UInt, UInt], Bool),
    termsAccepted: Bool,
    Response1: Bytes(128),
  });
  init();

  A.only(() => {
    const reward = declassify(interact.reward);  
    const deadline = declassify(interact.deadline);
    const payment = declassify(interact.payment);
    });

  A.publish(reward, payment, deadline);
  commit();
  A.pay(reward);
  commit();
  
  B.only(() => {
 
   const termsAccepted =
   declassify(interact.accchallenge(reward, payment));
  });
  
  B.pay(payment);
  commit();

A.publish();
transfer(payment).to(A);
transfer(reward).to(B);
each([A, B], () => interact.seeTransfer());
commit();

exit();
})