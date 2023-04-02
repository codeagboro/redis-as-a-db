import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getAllPersons,
  getPersonById,
  updatePerson,
} from "../controllers/person.controllers.js";

export const router = Router();

router.get("/persons", getAllPersons);

router.get("/person/:id", getPersonById);

router.post("/person", createPerson);

router.put("/person/:id", updatePerson);

router.delete("/person/:id", deletePerson);
