export default interface IAuthor {
  id: number;
  is_organization: Boolean;
  user: {
    email: String;
    username: String;
    id: Number;
  };
}
