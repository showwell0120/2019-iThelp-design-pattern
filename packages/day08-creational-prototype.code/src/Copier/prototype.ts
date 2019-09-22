/// <reference path="declaration.ts" />

namespace PrototypeClass {
    interface I_ReportData {
        reporter: string;
        date: string;
        subject: string;
    }

    abstract class OutputReport implements PrototypeDeclaration.I_OutputPrototype {
        reportData: I_ReportData = null;

        constructor() { }

        clone() {
            return null;
        }

        getInnerHTML() {
            if (!this.reportData) return '';
            return `<div>
                <ul>
                    <li>具奏人：${this.reportData.reporter}</li>
                    <li>具奏日期：${this.reportData.date}</li>
                    <li>事由：${this.reportData.subject}</li>
                </ul>
            </div>`
        }
    }

    export class OutputReportA extends OutputReport {
        constructor() {
            super();
            this.reportData = {
                reporter: '老肥',
                date: '乾隆12年02月12日',
                subject: '<p><strong>奏請司庫墊款而免公用拮据由</strong><br />(附一：動撥司庫應於節年耗羨歸還墊款銀兩清單)<br />(附二：應動各年耗羨候款撥給銀兩清單)</p>'
            }
        }

        clone(): PrototypeDeclaration.I_OutputPrototype {
            return new OutputReportA();
        }
    }

    export class OutputReportB extends OutputReport {
        constructor() {
            super();
            this.reportData = {
                reporter: '老肥',
                date: '乾隆12年02月18日',
                subject: '<p><strong>奏查鹽山慶雲二縣貧戶酌供籽種並報初十後得雨分寸事</strong><br />(附件：各屬得雨分寸清單)</p>'
            }
        }

        clone(): PrototypeDeclaration.I_OutputPrototype {
            return new OutputReportB();
        }
    }
}

export class Copier {
    private outputPrototypeMap: { [s: string]: PrototypeDeclaration.I_OutputPrototype } = {};

    constructor(fileList: string[]) {
        let me = this;
        if (fileList && fileList.length) {
            fileList.map(f => me.outputPrototypeMap[f] = new PrototypeClass[`OutputReport${f}`]());
        }
    }

    createOne(s: string): PrototypeDeclaration.I_OutputPrototype {
        return this.outputPrototypeMap[s].clone();
    }
}