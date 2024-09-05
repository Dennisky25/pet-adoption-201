import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  None,
  Some,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Result,
  Canister,
} from "azle";

const User = Record({
  id: text,
  principal: Principal,
  name: text,
  phoneNumber: text,
  email: text,
  address: text,
  application: Vec(text),
});

const UserPayload = Record({
  name: text,
  phoneNumber: text,
  email: text,
  address: text,
});

const Pet = Record({
  id: text,
  name: text,
  species: text,
  breed: text,
  gender: text,
  age: text,
  petImage: text,
  description: text,
  healthStatus: text,
  shelterId: text,
  status: text,
});

const PetPayload = Record({
  name: text,
  species: text,
  breed: text,
  gender: text,
  age: text,
  petImage: text,
  description: text,
  healthStatus: text,
  shelterId: text,
});

const PetImage = Record({
  petId: text,
  petImage: text,
});

const updatePetPayload = Record({
  petId: text,
  healthStatus: text,
  age: text,
});

const Shelter = Record({
  id: text,
  principal: Principal,
  name: text,
  location: text,
  phoneNumber: text,
  email: text,
  pets: Vec(text),
});

const ShelterPayload = Record({
  name: text,
  location: text,
  phoneNumber: text,
  email: text,
});

const updateShelterPayload = Record({
  id: text,
  phoneNumber: text,
  email: text,
});

const Adoption = Record({
  id: text,
  petId: text,
  userId: text,
  userPhoneNumber: text,
  address: text,
  reasonForAdoption: text,
});

const AdoptionPayload = Record({
  petId: text,
  userId: text,
  userPhoneNumber: text,
  address: text,
  reasonForAdoption: text,
});

const AdoptionRecords = Record({
  adoptionId: text,
  userId: text,
  petId: text,
  petName: text,
  userName: text,
  userPhoneNumber: text,
  address: text,
  reasonForAdoption: text,
  dateOfAdoption: text,
  status: text,
});

const updateAdoption = Record({
  adoptionId: text,
  userName: text,
  userPhoneNumber: text,
  address: text,
  reasonForAdoption: text,
});

const Error = Variant({
  NotFound: text,
  InvalidPayload: text,
  EmptyField: text,
});

const UsersStorage = StableBTreeMap(0, text, User);
const PetsStorage = StableBTreeMap(1, text, Pet);
const SheltersStorage = StableBTreeMap(2, text, Shelter);
const AdoptionsStorage = StableBTreeMap(3, text, AdoptionRecords);

let userIdCounter = 0;
let petIdCounter = 0;
let shelterIdCounter = 0;
let adoptionIdCounter = 0;

// Utility function to generate unique IDs based on a counter
const generateId = (counter: number): string => {
  return `ID-${counter}`;
};

const validatePayload = (payload: object, requiredFields: string[]): Result<null, Error> => {
  for (const field of requiredFields) {
    if (!payload.hasOwnProperty(field) || !payload[field]) {
      return Err({ EmptyField: `Field ${field} is required.` });
    }
  }
  return Ok(null);
};

export default Canister({
  addUser: update([UserPayload], Result(User, Error), (payload) => {
    const validation = validatePayload(payload, ["name", "phoneNumber", "email", "address"]);
    if ("Err" in validation) {
      return validation;
    }

    const userId = generateId(++userIdCounter);
    const user = {
      id: userId,
      principal: ic.caller(),
      application: [],
      ...payload,
    };
    UsersStorage.insert(userId, user);
    return Ok(user);
  }),

  getUsers: query([], Vec(User), () => {
    return UsersStorage.values();
  }),

  getUser: query([text], Opt(User), (id) => {
    return UsersStorage.get(id);
  }),

  getUserOwner: query([], Result(User, Error), () => {
    const userOpt = UsersStorage.values().filter((user) => {
      return user.principal.toText() === ic.caller().toText();
    });
    if (userOpt.length === 0) {
      return Err({
        NotFound: `User with principal=${ic.caller()} not found`,
      });
    }
    return Ok(userOpt[0]);
  }),

  addPet: update([PetPayload], Result(Pet, Error), (payload) => {
    const validation = validatePayload(payload, ["name", "species", "breed", "gender", "age", "petImage", "description", "healthStatus", "shelterId"]);
    if ("Err" in validation) {
      return validation;
    }

    const petId = generateId(++petIdCounter);
    const pet = {
      id: petId,
      status: "notAdopted",
      ...payload,
    };
    PetsStorage.insert(petId, pet);
    return Ok(pet);
  }),

  addPetImage: update([PetImage], Result(PetImage, Error), (payload) => {
    const validation = validatePayload(payload, ["petId", "petImage"]);
    if ("Err" in validation) {
      return validation;
    }
    PetsStorage.insert(payload.petId, payload);
    return Ok(payload);
  }),

  getPet: query([text], Opt(Pet), (id) => {
    return PetsStorage.get(id);
  }),

  getPets: query([], Vec(Pet), () => {
    return PetsStorage.values();
  }),

  getPetsNotAdopted: query([], Vec(Pet), () => {
    return PetsStorage.values().filter((pet) => pet.status === "notAdopted");
  }),

  updatePetInfo: update([updatePetPayload], Result(Pet, Error), (payload) => {
    const petOpt = PetsStorage.get(payload.petId);
    if ("None" in petOpt) {
      return Err({ NotFound: "Pet not found" });
    }

    const pet = petOpt.Some;
    const updatedPet = {
      ...pet,
      healthStatus: payload.healthStatus,
      age: payload.age,
    };

    PetsStorage.insert(pet.id, updatedPet);
    return Ok(updatedPet);
  }),

  createShelter: update([ShelterPayload], Result(Shelter, Error), (payload) => {
    const validation = validatePayload(payload, ["name", "location", "phoneNumber", "email"]);
    if ("Err" in validation) {
      return validation;
    }

    const shelterId = generateId(++shelterIdCounter);
    const shelter = {
      id: shelterId,
      principal: ic.caller(),
      pets: [],
      ...payload,
    };
    SheltersStorage.insert(shelterId, shelter);
    return Ok(shelter);
  }),

  getShelter: query([text], Opt(Shelter), (id) => {
    return SheltersStorage.get(id);
  }),

  getShelters: query([], Vec(Shelter), () => {
    return SheltersStorage.values();
  }),

  getShelterOwner: query([], Result(Shelter, Error), () => {
    const shelterOpt = SheltersStorage.values().filter((shelter) => {
      return shelter.principal.toText() === ic.caller().toText();
    });
    if (shelterOpt.length === 0) {
      return Err({
        NotFound: `Shelter with principal=${ic.caller()} not found`,
      });
    }
    return Ok(shelterOpt[0]);
  }),

  updateShelterInfo: update(
    [updateShelterPayload],
    Result(Shelter, Error),
    (payload) => {
      const shelterOpt = SheltersStorage.get(payload.id);
      if ("None" in shelterOpt) {
        return Err({ NotFound: "Shelter not found" });
      }

      const shelter = shelterOpt.Some;
      const updatedShelter = {
        ...shelter,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
      };
      SheltersStorage.insert(shelter.id, updatedShelter);
      return Ok(updatedShelter);
    }
  ),

  searchPetsBySpecies: query([text], Vec(Pet), (species) => {
    return PetsStorage.values().filter((pet) => {
      return pet.species.toLowerCase() === species.toLowerCase();
    });
  }),

  fileForAdoption: update([AdoptionPayload], Result(AdoptionRecords, Error), (payload) => {
    const userOpt = UsersStorage.get(payload.userId);
    if ("None" in userOpt) {
      return Err({ NotFound: `User with ID ${payload.userId} not found` });
    }

    const petOpt = PetsStorage.get(payload.petId);
    if ("None" in petOpt) {
      return Err({ NotFound: `Pet with ID ${payload.petId} not found` });
    }

    const user = userOpt.Some;
    const pet = petOpt.Some;

    const adoptionId = generateId(++adoptionIdCounter);
    const records = {
      adoptionId: adoptionId,
      userId: user.id,
      petId: pet.id,
      userPhoneNumber: user.phoneNumber,
      address: user.address,
      reasonForAdoption: payload.reasonForAdoption,
      dateOfAdoption: new Date().toISOString(),
      userName: user.name,
      petName: pet.name,
      status: "pending",
    };

    user.application.push(records.adoptionId);
    AdoptionsStorage.insert(records.adoptionId, records);

    return Ok(records);
  }),

  getAdoptionRecords: query([], Vec(AdoptionRecords), () => {
    return AdoptionsStorage.values();
  }),

  getAdoptionRecord: query([text], Opt(AdoptionRecords), (id) => {
    return AdoptionsStorage.get(id);
  }),

  updateAdoptionRecord: update([updateAdoption], Result(AdoptionRecords, Error), (payload) => {
    const adoptionOpt = AdoptionsStorage.get(payload.adoptionId);
    if ("None" in adoptionOpt) {
      return Err({ NotFound: "Adoption not found" });
    }

    const adoption = adoptionOpt.Some;
    const updatedAdoption = {
      ...adoption,
      userName: payload.userName,
      userPhoneNumber: payload.userPhoneNumber,
      address: payload.address,
      reasonForAdoption: payload.reasonForAdoption,
    };

    AdoptionsStorage.insert(adoption.id, updatedAdoption);
    return Ok(updatedAdoption);
  }),

  completeAdoption: update([text], Result(AdoptionRecords, Error), (adoptionId) => {
    const adoptionOpt = AdoptionsStorage.get(adoptionId);
    if ("None" in adoptionOpt) {
      return Err({ NotFound: "Adoption not found" });
    }

    const adoption = adoptionOpt.Some;
    const updatedAdoption = {
      ...adoption,
      status: "completed",
    };

    const petOpt = PetsStorage.get(adoption.petId);
    if ("None" in petOpt) {
      return Err({ NotFound: "Pet not found" });
    }

    const pet = petOpt.Some;
    const updatedPet = {
      ...pet,
      status: "adopted",
    };

    PetsStorage.insert(adoption.petId, updatedPet);
    AdoptionsStorage.insert(adoptionId, updatedAdoption);

    return Ok(updatedAdoption);
  }),

  failAdoption: update([text], Result(AdoptionRecords, Error), (adoptionId) => {
    const adoptionOpt = AdoptionsStorage.get(adoptionId);
    if ("None" in adoptionOpt) {
      return Err({ NotFound: "Adoption not found" });
    }

    const adoption = adoptionOpt.Some;
    const updatedAdoption = {
      ...adoption,
      status: "failed",
    };

    AdoptionsStorage.insert(adoptionId, updatedAdoption);
    return Ok(updatedAdoption);
  }),

  deleteUser: update([text], Result(text, Error), (userId) => {
    const userOpt = UsersStorage.get(userId);
    if ("None" in userOpt) {
      return Err({ NotFound: `User with ID ${userId} not found` });
    }
    UsersStorage.remove(userId);
    return Ok(`User with ID ${userId} deleted successfully`);
  }),

  deletePet: update([text], Result(text, Error), (petId) => {
    const petOpt = PetsStorage.get(petId);
    if ("None" in petOpt) {
      return Err({ NotFound: `Pet with ID ${petId} not found` });
    }
    PetsStorage.remove(petId);
    return Ok(`Pet with ID ${petId} deleted successfully`);
  }),

  deleteShelter: update([text], Result(text, Error), (shelterId) => {
    const shelterOpt = SheltersStorage.get(shelterId);
    if ("None" in shelterOpt) {
      return Err({ NotFound: `Shelter with ID ${shelterId} not found` });
    }
    SheltersStorage.remove(shelterId);
    return Ok(`Shelter with ID ${shelterId} deleted successfully`);
  }),
});

globalThis.crypto = {
  getRandomValues: () => {
    let array = new Uint8Array(32);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
};
