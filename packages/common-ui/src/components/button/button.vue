<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '../ui/button'
import { cn } from '@visuejs/shared/utils'
import { LoaderCircle } from 'lucide-vue-next'
import { computed } from 'vue'
import { Button, buttonVariants } from '../ui/button'

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  class: '',
  loading: false,
  disabled: false,
})

const isDisabled = computed(() => {
  return props.disabled || props.loading
})

const shouldHideContent = computed(() => {
  return props.loading && props.size === 'icon'
})
</script>

<template>
  <Button
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :variant="variant"
    :size="size"
    :disabled="isDisabled"
  >
    <LoaderCircle
      v-if="loading"
      :class="cn(
        'size-4 shrink-0 animate-spin',
        {
          'mr-2': !shouldHideContent,
        },
      )"
    />
    <slot v-if="!shouldHideContent" />
  </Button>
</template>
