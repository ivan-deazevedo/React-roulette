export interface User{
    id: number,
    voornaam: string,
    familienaam: string,
    isChecked: boolean,
}

export interface PostUser{
    voornaam: string,
    familienaam: string,
}

export interface DeleteUser{
    id: number,
    voornaam: string,
}