import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addCommand({
			id: 'transform-text',
			name: 'Transform Text',
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "r"}],
			callback: () => {
				this.app.commands.executeCommandById('replace-text:replace')
			}
		});

		this.addCommand({
			id: 'sample',
			name: 'sample',
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "a"}],
			callback: () => {
				console.log("Hey, you!");
			},
		});

		this.addCommand({
			id: 'replace',
			name: 'replace',
			editorCallback: editor => {
				const sel = editor.getSelection();
				if (sel)
				{
					editor.replaceSelection(`{c1::${sel}}`);
				}
			}
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
