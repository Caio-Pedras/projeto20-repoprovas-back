import { faker } from "@faker-js/faker";
import { TestInterface } from "../../src/services/testService";

export default function testFactory(): TestInterface {
  const test = {
    name: faker.lorem.words(3),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    discipline: "JavaScript",
    teacher: "Diego Pinho",
  };
  return test;
}
