import * as yup from "yup";

export const schema = yup.object().shape({
    title: yup
        .string()
        .required("სათაური სავალდებულოა")
        .min(3, "სათაური მინიმუმ 3 სიმბოლოსგან უნდა შედგებოდეს")
        .max(255, "მაქსიმუმ 255 სიმბოლო"),

    description: yup
        .string()
        .test(
            "min-words",
            "აღწერა მინიმუმ 4 სიტყვა უნდა იყოს",
            (value) => !value || value.trim().split(/\s+/).length >= 4
        )
        .max(255, "მაქსიმუმ 255 სიმბოლო"),

    priority: yup
        .string()
        .required("პრიორიტეტი არჩევა სავალდებულოა")
        .oneOf(["მაღალი", "საშუალო", "დაბალი"]),

    status: yup
        .string()
        .required("სტატუსი არჩევა სავალდებულოა")
        .oneOf(["დასაწყები", "პროგრესში", "მზად ტესტირებისთვის", "დასრულებული"]),

    department: yup.string().required("დეპარტამენტი სავალდებულოა"),

    responsible: yup.string().required("პასუხისმგებელი თანამშრომელი სავალდებულოა"),

    deadline: yup
        .date()
        .required("დედლაინი სავალდებულოა")
        .min(new Date(new Date().setDate(new Date().getDate() + 1)), "გთხოვთ, მიუთითეთ ხვალინდელი ან უფრო გვიანი თარიღი"),
});
