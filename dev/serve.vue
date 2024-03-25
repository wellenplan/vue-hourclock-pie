<script lang="ts">
import { defineComponent } from "vue";
import HourclockPie from "@/hourclock-pie.vue";

export default defineComponent({
  name: "ServeDev",
  components: {
    HourclockPie,
  },
  setup() {
    return {
      data: [
        {
          label: "top of the hour jingle",
          value: 1 * 60,
          color: "#ff0000",
        },
        {
          label: "introduction",
          value: 4 * 60,
          color: "#00ff00",
        },
        {
          label: "music",
          value: 10 * 60,
          color: "#0000ff",
        },
      ],
    };
  },
});
</script>

<template>
  <div id="app">
    <hourclock-pie :data="data" empty-color="#aaa" />
  </div>
</template>
