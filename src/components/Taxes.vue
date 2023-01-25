<script setup lang="ts">
import type { Tax } from "@/stores/town";

const props = defineProps<{
    taxes: Tax,
    raiseTaxes: (target: string, amount: number) => void
    decreaseTaxes: (target: string, amount: number) => void
}>()
</script>

<template>
    <div>
        <h3>Taxes</h3>
        <ul>
            <li v-for="(value, key) in props.taxes" :key="key">
                <p>{{ key }}: {{ value }}</p>
                <button @click="props.raiseTaxes(key, 5)">Raise</button>
                <button @click="props.decreaseTaxes(key, 5)">decrease</button>
            </li>
        </ul>
    </div>
</template>
