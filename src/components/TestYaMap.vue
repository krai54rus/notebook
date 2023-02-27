<!-- eslint-disable no-undef -->
<script lang="ts" setup>
  import {
    computed,
    ref,
    onMounted,
    onBeforeUnmount,
    watch,
    reactive,
  } from 'vue'
  import iconHouse from '@/assets/icons/map-house.png' // не поддерживает svg

  // const props = defineProps({
  //   coords: {
  //     type: Array,
  //     default: () => [59.910173, 30.285394],
  //   },
  // })

  let myMap = reactive({})
  let mark = reactive({})

  let coords = reactive([59.910173, 30.285394])

  const options = {
    center: coords,
    zoom: 15,
    controls: ['smallMapDefaultSet'],
  }
  const iconSetup = computed(() => ({
    iconLayout: 'default#imageWithContent',
    iconImageHref: 'http://www.cospender.com/images/icons/apple-icon.png',
    iconImageSize: [67, 69],
    iconImageOffset: [-34, -69],
  }))

  const createMap = async () => {
    ymaps.ready(() => {
      // инициализация карты в указанном элементе
      myMap = new ymaps.Map('map', options)

      mark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          // hintContent: 'текст для хинта',
          // balloonContent: 'текст при клике',
        },
        iconSetup.value
      )

      myMap.geoObjects.add(mark)
    })
  }

  const loadScript = () => {
    if (document.getElementById('ya-map')) {
      return
    }

    const script = document.createElement('script')

    script.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('id', 'ya-map')
    document.head.appendChild(script)

    script.onload = () => {
      createMap()
    }

    script.onerror = () => {
      throw new Error('Не удалось загрузить скрипт! .·´¯`(>▂<)´¯`·. ')
    }
  }

  onMounted(() => {
    loadScript()
  })

  onBeforeUnmount(() => {
    if (myMap && myMap.geoObjects) {
      myMap.geoObjects.removeALl()
    }
  })

  const setCoords = (coords: number[]) => {
    console.log('setCoords ', coords)
    console.log('mark ', mark)
    // coords = coords
    // const iconMark = new ymaps.Placemark(
    //   myMap.getCenter(),
    //   {
    //     // hintContent: 'текст для хинта',
    //     // balloonContent: 'текст при клике',
    //   },
    //   iconSetup.value
    // )
    // myMap.geoObjects.add(coords)
    mark.geometry.setCoordinates(coords)
  }

  //  Не перезагружается карта

  watch(
    () => coords,
    () => {
      console.log('sadsf')

      // createMap();
      console.log('🚀 ~ file: YaMap.vue ~ line 81 ~ watch ~ myMap', myMap)

      myMap.update()
    }
  )
</script>

<template>
  <div class="n-flex">
    <div class="map" id="map" />
    <div class="n-ml-16 n-flex n-flex-column">
      <nb-button
        class="n-mb-8"
        text="number 1"
        color="green"
        @click="setCoords([59.912487, 30.2826])"
      ></nb-button>
      <nb-button
        class="n-mb-8"
        text="number 2"
        color="blue"
        @click="setCoords([59.911533, 30.27735])"
      ></nb-button>
      <nb-button
        class="n-mb-8"
        text="number 3"
        color="red"
        @click="setCoords([59.91474, 30.291417])"
      ></nb-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .map {
    height: 700px;
    width: 700px;
  }
</style>
