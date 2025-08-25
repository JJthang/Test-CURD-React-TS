// Employee interface for example
interface Personnel {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  email: string;
  address: string;
}
export type { Personnel };
