<template>
	<div class="upload-list-qa">
		<input type="file" hidden="true" ref="file" @change="onChange">
		<button class="button" @click="handleClick">Загрузите файл</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import parseQA from '@/api/parseQA';
import parseQAXml from '@/api/parseQAXml';
import '@/scss/components/upload-list-qa.scss';

interface IFileInfo {
	content: string,
	name: string,
	type: string,
}

export default defineComponent({
	emits: ['result'],
	methods: {
		/**
		 * Реагируем на загрузку файла
		 */
		async onChange(e: any): Promise<void> {
			if (!e.target.files || e.target.files.length === 0) {
				return;
			}
			let result: IFileInfo = await this.getFileContent(e.target.files[0]);
			let parseList:QA[] = [];
			if (result.type === 'txt') {
				parseList = parseQA(result.content);
			} else if (result.type === 'xml') {
				parseList = await parseQAXml(result.content);
			}
			this.result(result.name, parseList);
		},
		
		/**
		 * Отправляем результат работы компонента
		 */
		result(listName: String, list: QA[]): void {
			this.$emit('result', { 
				listName,
				list,
			});
		},

		/**
		 * По клику по открываем окно выбора файла
		 */
		handleClick(): void {
			if(this.$refs.file instanceof HTMLInputElement) {
				this.$refs.file.click();
			}
		},

		/**
		 * Загружаем контент файла
		 */
		async getFileContent(file: File): Promise<IFileInfo> {
			let reader: FileReader = new FileReader();
			reader.readAsText(file);
			return new Promise((resolve) => {
				reader.onload = () => {
					if (reader.readyState === 2 && typeof(reader.result) === 'string') {
						resolve({
							content: reader.result,
							name: file.name,
							type: this.getType(file.name),
						});
					}
				};
			});
		},

		getType(name: string): string {
			let arr: string[] = name.split('.');
			return arr.pop() || '';
		},
	},
});
</script>
