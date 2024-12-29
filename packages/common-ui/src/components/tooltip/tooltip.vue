<script lang="ts" setup>
import type { TooltipContentProps } from 'radix-vue'
import type { HTMLAttributes, StyleValue } from 'vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface Props {
  title?: string
  delayDuration?: number
  side?: TooltipContentProps['side']
  contentClass?: HTMLAttributes['class']
  contentStyle?: StyleValue
}

withDefaults(defineProps<Props>(), {
  delayDuration: 100,
  side: 'top',
})
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <Tooltip>
      <TooltipTrigger as-child tabindex="-1">
        <slot />
      </TooltipTrigger>
      <TooltipContent
        :side="side"
        :class="contentClass"
        :style="contentStyle"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
