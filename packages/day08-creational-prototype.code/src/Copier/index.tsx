import * as React from "react";
import { Copier } from './prototype'

export interface I_Props_ReportCopier { }

interface I_Setting {
    reportA: number;
    reportB: number;

}

interface I_Output {
    reportA: string[];
    reportB: string[];

}

export const ReportCopier: React.FC<I_Props_ReportCopier> = props => {
    const [setting, setSetting] = React.useState<I_Setting>({
        reportA: 1,
        reportB: 1
    });

    const [output, setOutput] = React.useState<I_Output>({
        reportA: [],
        reportB: []
    })

    const handleFieldChange = ({ target }) => {
        setSetting(order => ({
            ...order,
            [target.name]: target.value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const reportCopier = new Copier(['A', 'B']);
        let copiedReportAList: string[] = [];
        for (let i = 0; i < setting.reportA; i++) {
            let clonedA = reportCopier.createOne("A");
            copiedReportAList.push(clonedA.getInnerHTML().concat(`<small>這是reportA的第${i + 1}份<small>`));
        }
        let copiedReportBList: string[] = [];
        for (let j = 0; j < setting.reportB; j++) {
            let clonedB = reportCopier.createOne("B");
            copiedReportBList.push(clonedB.getInnerHTML().concat(`<small>這是reportB的第${j + 1}份<small>`));
        }

        setOutput(output => ({
            ...output,
            reportA: copiedReportAList,
            reportB: copiedReportBList
        }))
    }

    return <div>
        <div className="setting">
            <form onSubmit={handleSubmit}>
                <label htmlFor="reportA">reportA 份數：</label>
                <input type="number" min={0} name="reportA" value={setting.reportA} onChange={handleFieldChange} />
                <label htmlFor="reportB">reportB 份數：</label>
                <input type="number" min={0} name="reportB" value={setting.reportB} onChange={handleFieldChange} />
                <input type="submit" value="啟動"></input>
            </form>
        </div>
        <div className="output">
            <h3>output</h3>
            <div>{output.reportA && output.reportA.length && output.reportA.map(copied => {
                return <div style={{ border: '1px solid #bdbdbd' }} dangerouslySetInnerHTML={{ __html: copied }}></div>
            })}</div>
            <div>{output.reportB && output.reportB.length && output.reportB.map(copied => {
                return <div style={{ border: '1px solid #bdbdbd' }} dangerouslySetInnerHTML={{ __html: copied }}></div>
            })}</div>
        </div>
    </div >

}
