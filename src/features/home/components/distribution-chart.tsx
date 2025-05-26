'use client';

import { Label, Pie, PieChart } from 'recharts';
import { Props } from 'recharts/types/component/Label';

import { Card } from '@/components/layout/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/lib/string';
import { TCategory, TCompleteAccount } from '@/types/database';

import { getDistributionChartData } from '../lib/distribution-chart-data';

interface DistributionChartLabelProps {
  userAccounts: TCompleteAccount[];
  userCategories: TCategory[];
}

export const DistributionChart = ({
  userAccounts,
  userCategories,
}: DistributionChartLabelProps) => {
  const { chartConfig, chartData, totalValue } = getDistributionChartData(
    userAccounts,
    userCategories
  );

  return (
    <Card className="md:max-w-full flex flex-col items-center">
      <h2 className="text-center text-2xl font-bold">Distribuição de gastos por categoria</h2>

      <ChartContainer className="w-full max-w-full h-[25rem] pt-4" config={chartConfig}>
        <PieChart>
          <ChartLegend content={<ChartLegendContent />} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            animationDuration={1000}
            cornerRadius={2}
            cx="50%"
            cy="50%"
            data={chartData}
            dataKey="value"
            innerRadius="50%"
            labelLine={true}
            nameKey="name"
            outerRadius="100%"
            paddingAngle={5}
            radius={'5rem'}
          >
            <Label content={<DistributionChartLabel totalValue={totalValue} />} />
          </Pie>
        </PieChart>
      </ChartContainer>
    </Card>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const DistributionChartLabel = ({ totalValue, viewBox }: { totalValue: number } & Props) => {
  if (!(viewBox && 'cx' in viewBox && 'cy' in viewBox)) return null;

  return (
    <text dominantBaseline="middle" textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
      <tspan
        className="fill-foreground text-xl md:text-base font-bold"
        x={viewBox.cx}
        y={viewBox.cy}
      >
        {formatCurrency(totalValue)}
      </tspan>
      <tspan className="text-lg fill-foreground" x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
        Total
      </tspan>
    </text>
  );
};
