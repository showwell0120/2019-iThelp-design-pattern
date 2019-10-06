import { I_Command } from './declaration'

abstract class Command implements I_Command {
    protected backup: string;
    protected editorRef: React.RefObject<any>;
    constructor(editorRef) {
        this.editorRef = editorRef;
    }
    public saveBackUp() {
        this.backup = this.editorRef.current.getText();
    }
    public undo() {
        this.editorRef.current.setText(this.backup);
    }
    public execute(): void { }
}

export class CopyCommand extends Command {
    public execute(): void {
        this.editorRef.current.selectText();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
}

export class PasteCommand extends Command {
    public execute(): void {
        this.saveBackUp();
        navigator.clipboard.readText().then(copiedText => {
            if (copiedText && copiedText.length) {
                let oriText = this.editorRef.current.getText();
                this.editorRef.current.setText(oriText.concat(copiedText));
            }
        })
    }
}

export class ClearCommand extends Command {
    public execute(): void {
        this.saveBackUp();
        this.editorRef.current.setText('');
    }
}

export class EmojiCommand extends Command {
    protected emoji: string;
    constructor(editorRef, emoji: string) {
        super(editorRef);
        this.emoji = emoji;
    }
    public execute(): void {
        this.saveBackUp();
        let oriText = this.editorRef.current.getText();
        this.editorRef.current.setText(oriText.concat(this.emoji));
    }
}

