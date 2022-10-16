<template>
	<upload-list-q-a v-if="!isShowTest" @result="handleResult" />
	<lists-q-a
		v-model="selectList"
		@update:model-value="selectList = $event"
		:all-lists="allLists"
	/>
	<test-q-a v-if="isShowTest" :list="currentList" @finish="handleFinish" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListsQA from './components/ListsQA.vue';
import TestQA from './components/TestQA.vue';
import UploadListQA from './components/UploadListQA.vue';

export default defineComponent({
	name: 'App',

	components: {
		UploadListQA,
		TestQA,
		ListsQA,
	},

	data(): {
		currentList: QA[],
		allLists: QAList[],
		selectList: string,
	} {
		return {
			currentList: [],
			allLists: [],
			selectList: '',
		};
	},

	computed: {
		isShowTest(): boolean {
			return this.currentList.length > 0;
		},
	},

	methods: {
		handleResult({ listName, list }: { listName: string; list: QA[]}):void {
			this.currentList = list;
			this.allLists.push({
				name: listName,
				list,
			});
		},

		handleFinish():void {
			this.currentList = [];
		},
	},
});
</script>
