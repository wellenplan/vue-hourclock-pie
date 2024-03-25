<template>
  <div v-if="props.data">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  type PluginChartOptions,
  CategoryScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { type Context as DatalabelsContext } from "chartjs-plugin-datalabels";
import invert from "invert-color";

interface DataProps {
  label: string;
  value: number;
  color: string;
}

interface Props {
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
      display: "auto",
      anchor: "end",
      align: "start",
      formatter: function (_value: number, ctx: DatalabelsContext): string {
        // @ts-expect-error ts thinks the label could be none
        return ctx.chart.data.labels[ctx.dataIndex] || "";
      },
      color: function (ctx: DatalabelsContext): string {
        // @ts-expect-error ts thinks the color could be none
        return invert(ctx.dataset.backgroundColor[ctx.dataIndex]);
      },
      rotation: function (ctx: DatalabelsContext): number {
        const valuesBefore = ctx.dataset.data
          .slice(0, ctx.dataIndex)
        // @ts-expect-error ts thinks a + [ a + b ] is possible
          .reduce((a, b) => a + b, 0);
        // @ts-expect-error ts thinks a + [ a + b ] is possible
        const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
        const rotation =
        // @ts-expect-error ts thinks the data could be empty 
          ((valuesBefore + ctx.dataset.data[ctx.dataIndex] / 2) / sum) * 360;
        return rotation < 180 ? rotation - 90 : rotation + 90;
      },
      font: {
        weight: "bold",
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
