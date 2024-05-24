export interface Resto{
    id: string,
    naam: string,
    teller: number,
    weburl: string,
    isChecked: boolean,
}

export interface PostResto{
    naam: string,
    weburl: string,
}

export interface DeleteResto{
    id: string,
    naam: string,
}