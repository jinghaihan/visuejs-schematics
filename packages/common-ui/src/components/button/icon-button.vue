<script lang="ts" setup>
import type { Component, HTMLAttributes } from 'vue'
import { cn } from '@visuejs/shared/utils'
import { Icon } from '../icon'
import Button from './button.vue'

const props = defineProps<{
  // eslint-disable-next-line ts/no-unsafe-function-type
  icon?: Component | Function | string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Button
    :class="cn('rounded-full', props.class)"
    variant="ghost"
    size="icon"
  >
    <slot>
      <Icon :icon="props.icon" />
    </slot>
  </Button>
</template>
