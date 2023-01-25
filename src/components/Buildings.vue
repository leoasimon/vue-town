<script setup lang="ts">
import type { Building } from '@/stores/town'
import { computed, defineProps } from 'vue'

interface DisplayBuilding extends Building {
    count: number

}

const props = defineProps<{
  buildings: Building[],
  build: (building: Building) => void
}>()

const displayBuildings = computed(() => {
    const dict = props.buildings.reduce((acc, building) => {
        if (acc[building.name]) {
            return {
                ...acc,
                [building.name]: {
                    ...building,
                    count: acc[building.name].count + 1
                }
            }
        }
        return {
            ...acc,
            [building.name]: {
                ...building,
                count: 1
            }
        }
    }, {} as Record<string, DisplayBuilding>)

    return Object.keys(dict).map(key => dict[key])
})

</script>

<template>
    <div>
        <h3>Buildings</h3>
        <table border="1">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Incomes</td>
                    <td>Housing</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="building in displayBuildings" :key="building.name">
                    <td>{{ building.name }} ({{ building.count }})</td>
                    <td>{{ building.incomes }}</td>
                    <td>{{ building.housing }}</td>
                    <td><button @click="props.build(building)">Buy</button></td>
                </tr>                
            </tbody>
        </table>
    </div>
</template>
