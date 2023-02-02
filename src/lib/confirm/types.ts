export interface ConfirmButton {
    text: string;
    color: string;
    icon?: string;
}

export interface ConfirmButtons {
    cancel: ConfirmButton;
    confirm: ConfirmButton;
}

export interface ConfirmOptions {
    message?: string,
    icon?: string,
    buttons?: ConfirmButtons,
}

export interface ConfirmData extends ConfirmOptions {
    title: string;
}