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
import { transacoes } from '@/mocks/transacoes';

import { getDistributionChartData } from '../lib/distribution-chart-data';

export const DistributionChart = () => {
  const { chartConfig, chartData } = getDistributionChartData();

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
            <Label content={<DistributionChartLabel />} />
          </Pie>
        </PieChart>
      </ChartContainer>
    </Card>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const DistributionChartLabel = ({ viewBox }: { categoria?: string } & Props) => {
  if (!(viewBox && 'cx' in viewBox && 'cy' in viewBox)) return null;

  return (
    <text dominantBaseline="middle" textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
      <tspan
        className="fill-foreground text-xl md:text-base font-bold"
        x={viewBox.cx}
        y={viewBox.cy}
      >
        {transacoes
          .reduce((sum, transacao) => sum + transacao.valor, 0)
          .toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          })}
      </tspan>
      <tspan className="text-lg fill-foreground" x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
        Total
      </tspan>
    </text>
  );
};
