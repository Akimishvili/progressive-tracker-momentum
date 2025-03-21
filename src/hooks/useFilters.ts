import { useState, useEffect } from "react";

import { apiToken, baseURL } from "../services/config.ts";
import { Department, Priority } from "../types/types.ts";

const useFilters = () => {
    const [departments, setDepartments] = useState<string[]>([]);
    const [priorities, setPriorities] = useState<string[]>([]);
    const [employees, setEmployees] = useState<{ name: string; surname: string; avatar: string }[]>([]);

    const [tempDepartments, setTempDepartments] = useState<string[]>([]);
    const [tempPriorities, setTempPriorities] = useState<string[]>([]);
    const [tempEmployee, setTempEmployee] = useState<string | null>(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await fetch(`${baseURL}/departments`, {
                headers: { Authorization: `Bearer ${apiToken}` },
            });
            const data = await response.json();
            setDepartments(data.map((d: Department) => d.name));
        };

        const fetchPriorities = async () => {
            const response = await fetch(`${baseURL}/priorities`, {
                headers: { Authorization: `Bearer ${apiToken}` },
            });
            const data = await response.json();
            setPriorities(data.map((p: Priority) => p.name));
        };

        const fetchEmployees = async () => {
            const response = await fetch(`${baseURL}/employees`, {
                headers: { Authorization: `Bearer ${apiToken}` },
            });
            const data = await response.json();
            setEmployees(data);
        };

        fetchDepartments();
        fetchPriorities();
        fetchEmployees();
    }, []);

    useEffect(() => {
        const savedDepartments = localStorage.getItem("selectedDepartments");
        const savedPriorities = localStorage.getItem("selectedPriorities");
        const savedEmployee = localStorage.getItem("selectedEmployee");

        if (savedDepartments) {
            setTempDepartments(JSON.parse(savedDepartments));
        }
        if (savedPriorities) {
            setTempPriorities(JSON.parse(savedPriorities));
        }
        if (savedEmployee) {
            setTempEmployee(savedEmployee);
        }
    }, []);

    const saveFiltersToLocalStorage = () => {
        localStorage.setItem("selectedDepartments", JSON.stringify(tempDepartments));
        localStorage.setItem("selectedPriorities", JSON.stringify(tempPriorities));
        if (tempEmployee) {
            localStorage.setItem("selectedEmployee", tempEmployee);
        } else {
            localStorage.removeItem("selectedEmployee");
        }
    };

    return {
        departments,
        priorities,
        employees,
        tempDepartments,
        setTempDepartments,
        tempPriorities,
        setTempPriorities,
        tempEmployee,
        setTempEmployee,
        saveFiltersToLocalStorage,
    };
};

export default useFilters;
