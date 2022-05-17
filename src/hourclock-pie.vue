<template>
  <template v-if="props.data">
    <Pie :chart-data="data" :chart-options="options" />
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  PluginChartOptions,
  CategoryScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Context as DatalabelsContext } from "chartjs-plugin-datalabels";
import invert from 'invert-color';

export interface DataProps {
  label: string;
  value: number;
  color: string;
}

export interface Props {
  data: DataProps[];
  resolution?: number;
  emptyColor?: string;
}

ChartJS.register(Title, Tooltip, ArcElement, CategoryScale, ChartDataLabels);

const props = withDefaults(defineProps<Props>(), {
  // resolution defaults to hourly
  resolution: 60 * 60,
  // emptyColor defaults to #fff
  emptyColor: "#fff",
});

const options = {
  plugins: {
    datalabels: {
      display: 'auto',
      anchor: 'end',
      align: 'start',
      formatter: function (_value: Number, ctx: DatalabelsContext): string {
        // @ts-ignore
        return ctx.chart.data.labels[ctx.dataIndex] || "";
      },
      color: function(ctx: DatalabelsContext): string {
        // @ts-ignore
        return invert(ctx.dataset.backgroundColor[ctx.dataIndex]);
      },
      rotation: function(ctx: DatalabelsContext): number {
        // @ts-ignore
        const valuesBefore = ctx.dataset.data.slice(0, ctx.dataIndex).reduce((a, b) => a+ b, 0);
        // @ts-ignore
        const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
        // @ts-ignore
        const rotation = ((valuesBefore + ctx.dataset.data[ctx.dataIndex] /2) /sum *360);
        return rotation < 180 ? rotation-90 : rotation+90;
      },
      font: {
        weight: 'bold',
      },
    },
    legend: {
      display: false,
    },
  },
  borderWidth: 0,
} as unknown as PluginChartOptions<"pie">;

const data = computed(() => {
  const { data, resolution, emptyColor } = props;

  const labels = data.map(({ label }) => label);
  const values = data.map(({ value }) => value);
  const colors = data.map(({ color }) => color);

  // add empty slices to fill the rest of the hour
  const remainder = getRemainder(getSum(values), resolution);
  if (remainder > 0) {
    labels.push("");
    values.push(remainder);
    colors.push(emptyColor);
  }

  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
      },
    ],
  };
});

function getSum(items: number[]): number {
  return items.reduce((acc: number, item) => acc + item, 0);
}

function getRemainder(sum: number, resolution: number): number {
  let remainder = sum % resolution;
  if (sum / resolution < 1) {
    remainder = resolution - sum;
  }
  return remainder;
}
</script>
