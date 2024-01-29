import { PieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';
import { IDataForChart } from '../../../hooks/useAnalytics';

const ChartRound = ({ data }: { data?: IDataForChart[] }) => {
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
    const num = +(percent * 100).toFixed(0);
    const value = num < 5 ? null : num + '%';
    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontWeight={'bold'}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  return (
    <>
      {!!data?.length && (
        <PieChart width={190} height={190}>
          <Pie
            data={data}
            cx={90}
            cy={90}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            color="black"
            textDecoration={'#0000'}
          >
            {data?.map(({ bgColor }: { bgColor: string }, index: number) => {
              return (
                <Cell
                  key={`cell-${index}-${bgColor}`}
                  fill={bgColor}
                  strokeWidth={2}
                />
              );
            })}
          </Pie>
        </PieChart>
      )}
    </>
  );
};

export default ChartRound;
