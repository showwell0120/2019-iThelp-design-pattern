export interface I_Command {
    saveBackUp: () => void;
    undo: () => void;
    execute: () => void;
}