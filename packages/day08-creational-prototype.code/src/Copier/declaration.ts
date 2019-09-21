namespace PrototypeDeclaration {
    export interface OutputPrototype {
        elRef: HTMLDivElement;
        clone(): OutputPrototype;
        getInnerHTML(): string;
    }
}

