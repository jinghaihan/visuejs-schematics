<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { Maximize, Minimize } from 'lucide-vue-next'
import { IconButton } from '../button'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <IconButton
    :icon="isFullscreen ? Minimize : Maximize"
    @click="toggle"
  />
</template>
