export const getDivideMoney = (value: string): string => {
  let res: string[] = []
  const arr = value.split('')
  while(!!arr.length){
    if(arr.length < 3) {
      const remainder = arr.length
      res.push(arr.splice(-remainder).join(''))
    }
    else res.push(arr.splice(-3).join(''))
  }
  return res.reverse().join(' ')
};

