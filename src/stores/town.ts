import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { v4 as uuid } from "uuid";

type Resource = Record<string, number>;
type Housing = Record<string, number>;
export type Tax = Record<string, Resource>;

export interface Building {
    id: string;
    name: string;
    constructionCost: number;
    incomes: Record<string, number>;
    housing: Housing;
}

const castle: Building = {
    id: 'castle',
    name: 'Castle',
    constructionCost: 100,
    incomes: {
        gold: -10,
    },
    housing: {},
}

const smallHouse: Building = {
    id: 'small-house',
    name: 'Small House',
    constructionCost: 10,
    incomes: {},
    housing: {
        peasants: 5,
    },
}

const smallHouse2: Building = {
    id: 'small-house2',
    name: 'Small House',
    constructionCost: 10,
    incomes: {},
    housing: {
        peasants: 5,
    },
}

function addResources(a: Record<string, number>, b: Record<string, number>) {
    return Object.keys(b).reduce((acc, key) => {
        acc[key] = (acc[key] | 0) + b[key];
        return acc;
    }, a);
}

function multResources(resources: Record<string, number>, multiplier: number) {
    return Object.keys(resources).reduce((acc, key) => {
        acc[key] = resources[key] * multiplier;
        return acc;
    }, {} as Record<string, number>);
}

export const useTownStore = defineStore('town', () => {
    const _buildings = ref<Building[]>([castle, smallHouse, smallHouse2]);
    const _resources = ref<Record<string, number>>({
        gold: 100,
    });
    const _taxes = ref<Tax>({
        peasants: {
            gold: 3,
        }
    });

    const population = computed(() => {
        return buildings.value.reduce((acc, building) => {
            return addResources(acc, building.housing);
        }, {} as Resource)
    })

    const incomes = computed(() => {
        return buildings.value.reduce((acc, building) => {
            return addResources(acc, building.incomes);
        }, {})
    })

    const taxIncomes = computed(() => {
        return Object.keys(population.value).reduce((acc, key) => {
            const toAdd = multResources(_taxes.value[key], population.value[key]);
            return addResources(acc, toAdd);
        }, {})
    })

    const taxes = computed(() => _taxes.value)

    const buildings = computed(() => _buildings.value)
    const resources = computed(() => _resources.value)

    function processIncomes() {
        _resources.value = addResources(_resources.value, incomes.value);
        _resources.value = addResources(_resources.value, taxIncomes.value);
    }

    function update() {
        processIncomes();
    }

    function build(model: Building) {
        const building = {
            ...model,
            id: uuid()
        };
        _buildings.value.push(building);
        _resources.value = addResources(_resources.value, building.incomes);
    }

    function raiseTaxes(target: string, amount: number) {
        _taxes.value[target] = multResources(_taxes.value[target], 1 + (amount / 10));
    }

    function decreaseTaxes(target: string, amount: number) {
        _taxes.value[target] = multResources(_taxes.value[target], 1 - (amount / 10));
    }

    return { buildings, resources, update, build, population, taxes, raiseTaxes, decreaseTaxes }
})