import * as React from "react";
import { Copier, I_CopierItem } from './prototype'

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
    let reportARef = React.useRef<HTMLDivElement>(null);
    let reportBRef = React.useRef<HTMLDivElement>(null);

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

        let items: I_CopierItem[] = [{
            fileName: 'A',
            el: reportARef.current
        }, {
            fileName: 'B',
            el: reportBRef.current
        }]
        const reportCopier = new Copier(items);
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
        <div className="reports">
            <div className="report" ref={reportARef}>
                <h3>A標題</h3>
                <p>A內文A內文A內文A內文A內文A內文A內文A內文A內文</p>
            </div>
            <div className="report" ref={reportBRef}>
                <h3>B標題</h3>
                <p>B內文B內文B內文B內文B內文B內文B內文B內文B內文</p>
            </div>
        </div>
        <div className="setting">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="reportA">reportA 份數：</label>
                    <input type="number" name="reportA" value={setting.reportA} onChange={handleFieldChange} />
                </div>
                <div>
                    <label htmlFor="reportB">reportB 份數：</label>
                    <input type="number" name="reportB" value={setting.reportB} onChange={handleFieldChange} />
                </div>
                <div><input type="submit" value="啟動"></input></div>
            </form>
        </div>
        <div className="output">
            <h2>reportA</h2>
            <div>{output.reportA && output.reportA.length && output.reportA.map(copied => {
                return <div dangerouslySetInnerHTML={{ __html: copied }}></div>
            })}</div>
            <hr />
            <h2>reportB</h2>
            <div>{output.reportB && output.reportB.length && output.reportB.map(copied => {
                return <div dangerouslySetInnerHTML={{ __html: copied }}></div>
            })}</div>
            <hr />
        </div>
    </div>

}
