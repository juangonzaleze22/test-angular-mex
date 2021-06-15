export interface Groups {
    id:   number,
    name: string,
    checked: boolean,
    employees: Employees[]
}

export interface Employees {
    id:       number;
    name:     string;
    group_id: number;
}