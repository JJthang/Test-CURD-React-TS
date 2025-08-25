import dayjs from "dayjs";

export const formatDate = (value: string) => {
  return dayjs(value).format("DD/MM/YYYY");
};
