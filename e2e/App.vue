<template>
  <div>
    <HourclockPie :data="example.data"/>
    <pre>{{ example }}</pre>
  </div>
</template>

<script setup>
import HourclockPie from '../src/HourclockPie.vue'

const example = {
    data: [
      {
        label: "top of the hour jingle",
        value: 1 * 60,
        color: "#ff0000",
      },
    ],
  };
</script>