interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member" | "guest";
}

function greetUser(user: User): string {
  return `Hello, ${user.name}! You are logged in as ${user.role}.`;
}

const currentUser: User = {
  id: 1,
  name: "Ada Lovelace",
  email: "ada@example.com",
  role: "admin",
};

console.log(greetUser(currentUser));

// Generics
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const users: User[] = [currentUser];
const first = firstItem(users);
//    ^?

// Type narrowing
function isAdmin(user: User): user is User & { role: "admin" } {
  return user.role === "admin";
}

if (isAdmin(currentUser)) {
  console.log(`${currentUser.name} has admin access.`);
}
