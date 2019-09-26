import * as React from 'react';
import { MeowAdapter, MeowAdaptee, VoiceMoodMapping, ActionNeedMapping } from './adapter';

export interface I_Props_MeowTranslator {}

export const MeowTranslator: React.FC<I_Props_MeowTranslator> = props => {
    const [options, setOptions] = React.useState<{ voice: string; tail: string }>({ voice: '', tail: '' });
    const [result, setResult] = React.useState<string>(null);

    const getOptions = (mappping): string[] => {
        return Object.keys(mappping)
            .map(key => {
                return mappping[key];
            })
            .flat();
    };

    const handleOptionsChange = ({ target }) => {
        setOptions(options => ({
            ...options,
            [target.name]: target.value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const meowAdaptee = new MeowAdaptee();
        const meowAdapter = new MeowAdapter(meowAdaptee);

        let mood = meowAdapter.getMood(options.voice);
        let action = meowAdapter.getAction(options.tail);

        setResult(`心情：${mood}<br />動作：${action}`);
    };

    return (
        <div>
            <h1>喵喵翻譯機</h1>
            <form onSubmit={handleSubmit} id="meowBehavior">
                <div>
                    <label htmlFor="voice">叫聲：</label>
                    <select value={options.voice} id="voice" name="voice" onChange={handleOptionsChange}>
                        <option />
                        {getOptions(VoiceMoodMapping).map((value, i) => (
                            <option key={`voice_${i}`} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="tail">尾巴：</label>
                    <select value={options.tail} id="tail" name="tail" onChange={handleOptionsChange}>
                        <option />
                        {getOptions(ActionNeedMapping).map((value, i) => (
                            <option key={`tail${i}`} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <input type="submit" value="送出"></input>
            </form>
            <div>
                <h2>翻譯結果</h2>
                <h3 dangerouslySetInnerHTML={{ __html: result }}></h3>
            </div>
        </div>
    );
};
