<script lang="ts" setup>
import type { Component } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
import { isHttpUrl } from '@visuejs/shared/utils'
import { isFunction, isObject, isString } from 'lodash-es'
import { DotIcon as IconDefault } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  // eslint-disable-next-line ts/no-unsafe-function-type
  icon?: Component | Function | string
  fallback?: boolean
}>()

const isRemoteIcon = computed(() => {
  return isString(props.icon) && isHttpUrl(props.icon)
})

const isComponent = computed(() => {
  const { icon } = props
  return !isString(icon) && (isObject(icon) || isFunction(icon))
})
</script>

<template>
  <component :is="icon as Component" v-if="isComponent" v-bind="$attrs" />
  <img v-else-if="isRemoteIcon" :src="icon as string" v-bind="$attrs">
  <IconifyIcon v-else-if="icon" v-bind="$attrs" :icon="icon as string" />
  <IconDefault v-else-if="fallback" v-bind="$attrs" />
</template>
