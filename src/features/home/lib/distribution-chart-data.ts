import { ChartConfig } from '@/components/ui/chart';
import { categorias } from '@/mocks/categorias';
import { transacoes } from '@/mocks/transacoes';

export const getDistributionChartData = () => {
  const chartConfig = categorias.reduce<ChartConfig>(
    (acc, categoria) => ({
      ...acc,
      [categoria.nome]: {
        color: categoria.cor,
        label: categoria.nome,
      },
    }),
    {} satisfies ChartConfig
  );

  const chartData = categorias
    .map((categoria) => {
      const total = transacoes
        .filter((transacao) => transacao.id_categoria === categoria.id)
        .reduce((sum, transacao) => sum + transacao.valor, 0);

      return {
        fill: categoria.cor,
        name: categoria.nome,
        value: total,
      };
    })
    .sort((a, b) => b.value - a.value);

  return { chartConfig, chartData };
};
