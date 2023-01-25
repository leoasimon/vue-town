<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    resources: Record<string, number>
    population: Record<string, number>
}>()
</script>

<template>
    <div>
        <h3>Resource</h3>
        <ul>
            <li v-for="(value, key) in resources" :key="key">
                {{ key }}: {{ value }}
            </li>
        </ul>
        <h3>population</h3>
        <ul>
            <li v-for="(value, key) in population" :key="key">
                {{ key }}: {{ value }}
            </li>
        </ul>
    </div>
</template>