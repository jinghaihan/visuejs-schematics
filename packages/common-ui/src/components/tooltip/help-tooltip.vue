<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@visuejs/shared/utils'
import { CircleHelp } from 'lucide-vue-next'
import Tooltip from './tooltip.vue'

defineProps<{ triggerClass?: HTMLAttributes['class'] }>()
</script>

<template>
  <Tooltip :delay-duration="300">
    <template #default>
      <slot>
        <CircleHelp
          :class="
            cn(
              'text-foreground/80 hover:text-foreground inline-flex size-5 cursor-pointer',
              triggerClass,
            )
          "
        />
      </slot>
    </template>
    <template #title>
      <slot name="title" />
    </template>
  </Tooltip>
</template>
