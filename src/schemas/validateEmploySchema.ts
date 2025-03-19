import * as yup from "yup";

export const employSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("სახელი სავალდებულოა")
        .min(2, "სახელი მინიმუმ 2 სიმბოლო უნდა იყოს")
        .max(255, "მაქსიმუმ 255 სიმბოლო")
        .matches(/^[a-zA-Zა-ჰ]+$/, "მხოლოდ ლათინური და ქართული სიმბოლოები დაიშვება"),

    lastName: yup
        .string()
        .required("გვარი სავალდებულოა")
        .min(2, "გვარი მინიმუმ 2 სიმბოლო უნდა იყოს")
        .max(255, "მაქსიმუმ 255 სიმბოლო")
        .matches(/^[a-zA-Zა-ჰ]+$/, "მხოლოდ ლათინური და ქართული სიმბოლოები დაიშვება"),

    avatar: yup
        .mixed()
        .required("ავატარი სავალდებულოა")
        .test("fileSize", "ფაილის ზომა არ უნდა აღემატებოდეს 600kb-ს", (value) => {
            if (value && value instanceof File) {
                return value.size <= 600000;
            }
            return false;
        })
        .test("fileType", "ფაილი უნდა იყოს სურათის ტიპის", (value) => {
            if (value && value instanceof File) {
                return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
            }
            return false;
        }),

    department: yup
        .string()
        .required("დეპარტამენტი სავალდებულოა")
        .oneOf([], "დეპარტამენტი უნდა იყოს valid API-დან მიღებული მონაცემი"),
});
