import { useState, useEffect } from "react";

import { apiToken, baseURL } from "../services/config.ts";
import { Task } from "../types/types.ts";

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch([baseURL, "tasks"].join("/"), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }

                const data: Task[] = await response.json();
                setTasks(data);
            } catch (err) {
                setError("Error fetching tasks");
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return { tasks, loading, error };
};

export default useTasks;
