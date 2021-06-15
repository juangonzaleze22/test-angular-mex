export interface EmployeesByGroup {
    employees: Employee[];
}

export interface Employee {
    id:       number;
    name:     string;
    group_id: number;
}
