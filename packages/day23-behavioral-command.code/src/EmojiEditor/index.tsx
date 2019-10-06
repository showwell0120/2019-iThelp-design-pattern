import * as React from 'react';

import { CopyCommand, PasteCommand, ClearCommand, EmojiCommand } from './command';
import { I_Command } from './declaration'

import './EmojiEditor.scss'

const EmojiEditor = React.forwardRef((props, ref) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const [textContent, setTextContent] = React.useState<string>('');

    React.useImperativeHandle(ref, () => ({
        getText(): string {
            return textContent;
        },
        setText(s: string): void {
            setTextContent(s);
        },
        selectText(): void {
            textAreaRef.current.select();
        }
    }))

    return <div className="text-input">
        <label htmlFor="textContent">文字內容:</label>
        <textarea ref={textAreaRef} name="textContent" id="textContent" rows={6} cols={64} value={textContent} onChange={e => setTextContent(e.target.value)}></textarea>
    </div>
})

export const EmojiApp: React.FC<any> = props => {
    const editorRef = React.useRef<HTMLDivElement>(null);

    const copyCmd = new CopyCommand(editorRef);
    const pasteCmd = new PasteCommand(editorRef);
    const clearCmd = new ClearCommand(editorRef);
    const happyEmojiCmd = new EmojiCommand(editorRef, 'ヽ(́◕◞౪◟◕‵)ﾉ');
    const dirtyEmojiCmd = new EmojiCommand(editorRef, 'ლ(◉◞౪◟◉ )ლ');

    const history: I_Command[] = [];

    const executeCmd = (cmd: I_Command) => {
        if (cmd.execute) {
            history.push(cmd);
            console.log('executeCmd - history:', history)
            cmd.execute();
        }
    }

    const undo = () => {
        if (history.length) {
            let cmd = history.pop();
            console.log('undo - history:', history)
            if (cmd !== null) cmd.undo();
        }

    }

    return (<div>
        <div className="emoji-list">
            <div className="emoji-wrapper">
                <span>覺得開心</span>
                <button onClick={e => executeCmd(happyEmojiCmd)}>ヽ(́◕◞౪◟◕‵)ﾉ</button>
            </div>
            <div className="emoji-wrapper">
                <span>使出猥瑣表情</span>
                <button onClick={e => executeCmd(dirtyEmojiCmd)}>ლ(◉◞౪◟◉ )ლ</button>
            </div>
        </div>
        <div className="editor">
            <div className="toolbar">
                <button onClick={e => undo()}>復原</button>
                <button onClick={e => executeCmd(copyCmd)}>複製</button>
                <button onClick={e => executeCmd(pasteCmd)}>貼上</button>
                <button onClick={e => executeCmd(clearCmd)}>清除</button>
            </div>
            <EmojiEditor ref={editorRef} />
        </div>
    </div>);
}