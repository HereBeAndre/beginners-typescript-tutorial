import { expect, it } from "vitest";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

type TCreateUser = () => Promise<string>;
type TGetUser = (id: string) => Promise<User>;

const createThenGetUser = async (
  createUser: TCreateUser,
  getUser: TGetUser
): Promise<User> => {
  const userId: string = await createUser();

  const user = await getUser(userId);

  return user;
};

it("Should create the user, then get them", async () => {
  const user = await createThenGetUser(
    async () => "123",
    async (id) => ({
      id,
      firstName: "Matt",
      lastName: "Pocock",
    })
  );

  expect(user).toEqual({
    id: "123",
    firstName: "Matt",
    lastName: "Pocock",
  });
});
