import type { Personnel, TableColumn } from "@/types";
import dayjs from "dayjs";

export const employeeColumns: TableColumn<Personnel>[] = [
  {
    key: "id",
    title: "ID",
    sortable: false,
    className: "text-gray-900 font-medium",
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
    className: "text-gray-900 font-medium",
  },
  {
    key: "dateOfBirth",
    title: "Date of birth",
    type: "date",
    sortable: false,
    className: "text-gray-600",
  },
  {
    key: "gender",
    title: "Gender",
    sortable: false,
    className: "text-gray-600",
  },
  {
    key: "email",
    title: "Email",
    sortable: false,
    className: "text-gray-600",
  },
  {
    key: "address",
    title: "Address",
    sortable: true,
    truncate: true,
    className: "text-gray-600",
  },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const defaultValues: Personnel = {
  id: "0",
  name: "",
  email: "",
  address: "",
  dateOfBirth: dayjs().toDate(),
  gender: "male",
};
