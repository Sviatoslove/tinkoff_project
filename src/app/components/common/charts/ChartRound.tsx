import { PieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';
import { useAppSelector } from '../../../hooks/hooks';
import {
  selectCategories,
  selectOperations,
} from '../../../store/operationsSlice';
import { COLORS, COLORSKeys } from '../../../utils/constants';
import getRandomNum from '../../../utils/getRandomNum';
import { Text } from '@chakra-ui/react';

const ChartRound = ({ title, view }: { title: string; view?: string }) => {
  const categories: any = useAppSelector(selectCategories());
  const operations = useAppSelector(selectOperations());
  const colorsKeys = [...COLORSKeys];

  const getCategoriesBalances = () => {
    return categories.reduce((acc: any, category: any) => {
      let totalBalanceDec = 0;
      let totalBalanceInc = 0;
      let incr = category.name === 'Пополнение счёта' && true
      operations?.forEach((operation: any) => {
        if (category.id === operation.category) {
          if (operation.dataType === 'operations') {
            totalBalanceDec += +operation.balance;
          } else {
            totalBalanceInc += +operation.balance;
          }
        }
      });

      return (acc = [
        ...acc,
        {
          name: category.name,
          value: view
            ? incr
              ? totalBalanceInc
              : totalBalanceDec
            : totalBalanceDec,
          bgColor: colorsKeys
            .splice(getRandomNum(0, colorsKeys.length - 1), 1)
            .toString(),
        },
      ]);
    }, []);
  };

  const getIncomeExpenses = () => {
    return ['operations', 'topUpCount'].reduce((acc: any, category: any) => {
      let totalBalance = 0;
      let incr = category === 'topUpCount' && true
      
      operations?.forEach((operation: any) => {
        if (operation.dataType === category) {
          totalBalance += +operation.balance;
        } 
      });

      return (acc = [
        ...acc,
        {
          name: category,
          value: totalBalance,
          bgColor: incr ? 'green' : 'red',
        },
      ]);
    }, []);
  };

  const arrData = view ? getIncomeExpenses() : getCategoriesBalances();

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    [key: string]: any;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontWeight={'bold'}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <Text>{title}</Text>
      <PieChart width={200} height={200}>
        <Pie
          data={arrData}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          color="black"
          textDecoration={'#0000'}
        >
          {arrData?.map(({ bgColor }: { bgColor: string }, index: number) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[bgColor]}
                strokeWidth={3}
              />
            );
          })}
        </Pie>
      </PieChart>
    </>
  );
};

export default ChartRound;
