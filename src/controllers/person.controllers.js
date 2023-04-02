import { personRepository } from "../models/person.js";

export const createPerson = async (req, res) => {
  const { firstname, lastname, age, email, password } = req.body;
  try {
    const data = {
      firstname,
      lastname,
      age,
      email,
      password,
    };

    const person = await personRepository.createAndSave(data);

    return res.status(201).json({
      status: "Success",
      message: `${firstname}, welcome to redis_db 😊😊😊`,
      person,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

export const getAllPersons = async (req, res) => {
  try {
    const persons = await personRepository.search().return.all();

    return res.status(200).json({ status: "Success", persons });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

export const getPersonById = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await personRepository.fetch(id);
    if (person.email === null) {
      return res
        .status(400)
        .json({ message: `User with id ${id} does not exist 😥` });
    }

    return res.status(200).json({ status: "Success", person });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

export const updatePerson = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, age, email, password } = req.body;
  try {
    //check if person exist
    const person = await personRepository.fetch(id);
    if (person.email === null) {
      return res
        .status(400)
        .json({ message: `User with id ${id} does not exist 😥` });
    }

    person.firstname = firstname ?? null;
    person.lastname = lastname ?? null;
    person.age = age ?? null;
    person.email = email ?? null;
    person.password = password ?? null;
    await personRepository.save(person);

    return res.status(200).json({ status: "Success", person });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

export const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await personRepository.fetch(id);
    if (person.email === null) {
      return res
        .status(400)
        .json({ message: `User with id ${id} does not exist 😥` });
    }
    await personRepository.remove(id);

    return res
      .status(200)
      .json({
        status: "Success",
        message: `User with id ${id} deleted successfully`,
      });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};
