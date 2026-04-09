<script setup lang="ts">
  import { computed } from 'vue'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart } from 'echarts/charts'
  import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components'

  use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
  ])

  type TPoint = {
    ts: string
    value: number
  }

  interface Props {
    failedToRun: TPoint[]
    launches: TPoint[]
    stats: TPoint[]
  }

  const props = defineProps<Props>()

  const formatTs = (ts: string) => {
    const date = new Date(Number(ts) * 1000)
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const xAxisTs = computed(() => props.launches.map(item => item.ts))

  const failedMap = computed(
    () => new Map(props.failedToRun.map(item => [item.ts, item.value]))
  )
  const launchesMap = computed(
    () => new Map(props.launches.map(item => [item.ts, item.value]))
  )
  const statsMap = computed(
    () => new Map(props.stats.map(item => [item.ts, item.value]))
  )
  const chartRows = computed(() =>
    xAxisTs.value.map(ts => {
      const launches = launchesMap.value.get(ts) ?? 0
      const stats = Math.min(statsMap.value.get(ts) ?? 0, launches)
      const failedToRun = Math.min(
        failedMap.value.get(ts) ?? 0,
        Math.max(launches - stats, 0)
      )
      const other = Math.max(launches - stats - failedToRun, 0)

      return {
        ts,
        launches,
        stats,
        failedToRun,
        other,
      }
    })
  )

  const option = computed(() => ({
    grid: {
      left: 24,
      right: 24,
      top: 48,
      bottom: 24,
      containLabel: true,
    },
    legend: {
      top: 8,
      data: ['stats', 'failedToRun'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: Array<{ axisValue: string; marker: string }>) => {
        const ts = params?.[0]?.axisValue ?? ''
        const launches = launchesMap.value.get(ts) ?? 0
        const stats = Math.min(statsMap.value.get(ts) ?? 0, launches)
        const failedToRun = Math.min(
          failedMap.value.get(ts) ?? 0,
          Math.max(launches - stats, 0)
        )

        const markers = {
          launches: '<span style="display:inline-block;margin-right:8px;border-radius:10px;width:10px;height:10px;background:#334155;"></span>',
          stats: '<span style="display:inline-block;margin-right:8px;border-radius:10px;width:10px;height:10px;background:#22c55e;"></span>',
          failedToRun:
            '<span style="display:inline-block;margin-right:8px;border-radius:10px;width:10px;height:10px;background:#ef4444;"></span>',
        }

        return `
          <div>${formatTs(ts)}</div>
          <div>${markers.launches} launches: <b>${launches}</b></div>
          <div>${markers.stats} stats: <b>${stats}</b></div>
          <div>${markers.failedToRun} failedToRun: <b>${failedToRun}</b></div>
        `
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisTs.value,
      axisLabel: {
        formatter: (value: string) => formatTs(value),
      },
    },
    yAxis: {
      type: 'value',
      name: 'value',
    },
    series: [
      {
        name: 'stats',
        type: 'bar',
        stack: 'launches',
        barWidth: 26,
        data: chartRows.value.map(item => item.stats),
        itemStyle: { color: '#22c55e' },
      },
      {
        name: 'failedToRun',
        type: 'bar',
        stack: 'launches',
        barWidth: 26,
        data: chartRows.value.map(item => item.failedToRun),
        itemStyle: { color: '#ef4444' },
      },
      {
        name: 'other',
        type: 'bar',
        stack: 'launches',
        barWidth: 26,
        data: chartRows.value.map(item => item.other),
        itemStyle: { color: '#cbd5e1' },
        tooltip: { show: false },
      },
    ],
  }))
</script>

<template>
  <VChart :option="option" autoresize style="width: 100%; height: 420px" />
</template>
