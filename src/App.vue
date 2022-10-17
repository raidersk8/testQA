<template>
	<upload-list-q-a v-if="!isShowTest" @result="handleResult" />
	<div class="wrap-list-qa">
		<lists-q-a
			v-model="selectListName"
			@update:model-value="setSelectListName"
			:all-lists="allLists"
		/>
		<switch-test :isDisable="isDisableSwitchTest" v-model="isStart" @update:model-value="switchTest" />
	</div>
	<test-q-a v-if="isShowTest" :list="currentList" @finish="handleFinish" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListsQA from './components/ListsQA.vue';
import TestQA from './components/TestQA.vue';
import UploadListQA from './components/UploadListQA.vue';
import SwitchTest from './components/SwitchTest.vue';
import '@/scss/components/app.scss';
import '@/scss/components/wrap-list-qa.scss';

export default defineComponent({
	name: 'App',

	components: {
		UploadListQA,
		TestQA,
		ListsQA,
		SwitchTest,
	},

	data(): {
		allLists: QAList[],
		selectListName: string,
		isStart: boolean,
	} {
		return {
			allLists: [],
			selectListName: '',
			isStart: false,
		};
	},

	computed: {
		currentList(): QA[] {
			let result: QAList | undefined = this.allLists.find((item) => item.name == this.selectListName);
			return result ? result.list : [];
		},

		isShowTest(): boolean {
			return this.isStart;
		},

		isDisableSwitchTest(): boolean {
			return this.allLists.length == 0;
		},
	},

	methods: {
		handleResult({ listName, list }: { listName: string; list: QA[]}):void {
			this.allLists.push({
				name: listName,
				list,
			});

			// Если это первый загруженный тест, то запускаем его сразу
			if (this.allLists.length == 1) {
				this.setSelectListName(listName);
				this.isStart = true;
			}
		},

		handleFinish(): void {
			this.switchTest(false);
		},

		handleSwitch(val: boolean): void {
			this.switchTest(val);
		},

		switchTest(val: boolean): void {
			this.isStart = val;
		},

		setSelectListName(val: string): void {
			this.selectListName = val;
		},
	},
});
</script>
