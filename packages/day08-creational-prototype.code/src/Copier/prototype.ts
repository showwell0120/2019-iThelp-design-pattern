/// <reference path="declaration.ts" />

namespace PrototypeClass {
    abstract class OutputReport implements PrototypeDeclaration.OutputPrototype {
        elRef: HTMLDivElement = null;

        constructor(elRef: HTMLDivElement) {
            this.elRef = elRef;
        }

        clone() {
            return null;
        }

        getInnerHTML() {
            if (!this.elRef) return '';
            return this.elRef.innerHTML;
        }
    }

    export class OutputReportA extends OutputReport {
        clone(): PrototypeDeclaration.OutputPrototype {
            return new OutputReportA(this.elRef);
        }
    }

    export class OutputReportB extends OutputReport {
        clone(): PrototypeDeclaration.OutputPrototype {
            return new OutputReportB(this.elRef);
        }
    }
}

export interface I_CopierItem {
    fileName: string;
    el: HTMLDivElement
}

export class Copier {
    private outputPrototypeMap: { [s: string]: PrototypeDeclaration.OutputPrototype } = {};

    constructor(fileList: I_CopierItem[]) {
        let me = this;
        if (fileList && fileList.length) {
            fileList.map(f => me.outputPrototypeMap[f.fileName] = new PrototypeClass[`OutputReport${f.fileName}`](f.el));
        }
    }

    createOne(s: string): PrototypeDeclaration.OutputPrototype {
        return this.outputPrototypeMap[s].clone();
    }
}