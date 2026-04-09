<script setup lang="ts">
  import LaunchStatsBarChart from '@/components/test/LaunchStatsBarChart.vue'

  const res = {
    responseData: {
      failedToRun: [
        { ts: '1775554740', value: 10 },
        { ts: '1775554800', value: 30 },
        { ts: '1775554860', value: 40 },
      ],
      launches: [
        { ts: '1775554740', value: 50 },
        { ts: '1775554800', value: 80 },
        { ts: '1775554860', value: 100 },
      ],
      stats: [
        { ts: '1775554740', value: 40 },
        { ts: '1775554800', value: 50 },
        { ts: '1775554860', value: 60 },
      ],
    },
  }
</script>

<template>
  <div :class="$style['refactor']">
    <h2 :class="$style['refactor__title']">Launches Chart Demo</h2>
    <LaunchStatsBarChart
      :failed-to-run="res.responseData.failedToRun"
      :launches="res.responseData.launches"
      :stats="res.responseData.stats"
    />
  </div>
</template>

<style lang="scss" module>
  $component: refactor;

  .#{$component} {
    width: 100%;
    height: 100%;
    padding: 24px;

    &__title {
      margin-bottom: 16px;
      color: var(--color-black-main);
      font-size: 20px;
      font-weight: var(--font-weight-semibold);
    }
  }
</style>
