import IAuthor from "./author";

export default interface IActivity {
  id?: number;
  title: string;
  created: Date | string;
  description: String;
  date: Date | string;
  author?: {
    id: number;
    user: {
      username: String;
      email: String;
    };
    is_organization: Boolean;
  };
  genre: String;
  participants?: IAuthor[];
}
