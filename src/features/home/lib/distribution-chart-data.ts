import { ChartConfig } from '@/components/ui/chart';
import { TCategory, TCompleteAccount } from '@/types/database';
/**
 * Retrieves data for the distribution chart based on user categories
 * @param accounts User accounts containing transactions
 * @param categories User categories for classification
 */
export const getDistributionChartData = (
  accounts: TCompleteAccount[],
  categories: TCategory[]
): {
  chartConfig: ChartConfig;
  chartData: { fill: string; name: string; value: number }[];
  totalValue: number;
} => {
  const chartConfig = getChartConfig(categories);
  const chartData = getChartData(accounts, categories);

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  return { chartConfig, chartData, totalValue };
};

/**
 * Generates chart configuration for the distribution chart
 */
const getChartConfig = (categories: TCategory[]) => {
  const chartConfig = categories.reduce<ChartConfig>(
    (acc, categoria) => ({
      ...acc,
      [categoria.nome]: {
        color: '#' + categoria.cor_hex,
        label: categoria.nome,
      },
    }),
    {} satisfies ChartConfig
  );

  chartConfig['Não classificado'] = {
    color: '#D9D9D9',
    label: 'Não classificado',
  };

  return chartConfig;
};

/**
 * Generates chart data for the distribution chart
 */
const getChartData = (accounts: TCompleteAccount[], categories: TCategory[]) => {
  const transactions = accounts.flatMap((account) => account.transacoes);

  const chartData = categories.map((categoria) => {
    const total = transactions
      .filter((transacao) => transacao.id_categoria === categoria.id && transacao.tipo === 's')
      .reduce((sum, transacao) => sum + transacao.valor, 0);

    return {
      fill: '#' + categoria.cor_hex,
      name: categoria.nome,
      value: total,
    };
  });

  const unclassifiedTotal = transactions
    .filter((transacao) => !transacao.id_categoria && transacao.tipo === 's')
    .reduce((sum, transacao) => sum + transacao.valor, 0);

  if (unclassifiedTotal > 0)
    chartData.push({
      fill: '#D9D9D9',
      name: 'Não classificado',
      value: unclassifiedTotal,
    });

  return chartData.sort((a, b) => b.value - a.value);
};
