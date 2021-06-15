export interface Employees {
    employees: Employee[];
}

export interface Employee {
    id:        number;
    name:      string;
    last_name: string;
    birthday:  number | null;
}
export interface formEmployee {
    name:      string;
    last_name: string;
    date:      string;
}