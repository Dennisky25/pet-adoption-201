# Pet Adoption Platform

This project is a pet adoption platform built on the Internet Computer using Azle. The platform allows users to view, adopt, and manage pets, shelters, and adoption records. The backend is implemented using Azle, a TypeScript-based framework for building Internet Computer canisters.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Canister Functions](#canister-functions)
- [Data Structures](#data-structures)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Pet Adoption Platform enables users to:

- Create and manage user profiles.
- Create and manage shelters.
- Add pets to shelters.
- Search for pets by species.
- Apply for pet adoption.
- Manage adoption records.

## Getting Started

### Prerequisites

- Node.js (v14+)
- DFX (Internet Computer SDK)
- Azle (TypeScript framework for building canisters)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/pet-adoption-platform.git
   cd pet-adoption-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the local Internet Computer replica:

   ```bash
   dfx start --background
   ```

4. Deploy the canister:

   ```bash
   dfx deploy
   ```

## Canister Functions

### User Functions

- **addUser(UserPayload): Result<User, Error>**
  - Adds a new user with the provided details.

- **getUsers(): Vec<User>**
  - Returns all users in the system.

- **getUser(id: text): Opt<User>**
  - Fetches a user by their ID.

- **getUserOwner(): Result<User, Error>**
  - Retrieves the user associated with the calling principal.

### Pet Functions

- **addPet(PetPayload): Result<Pet, Error>**
  - Adds a new pet to the system.

- **getPet(id: text): Opt<Pet>**
  - Fetches a pet by its ID.

- **getPets(): Vec<Pet>**
  - Returns all pets in the system.

- **getPetsNotAdopted(): Vec<Pet>**
  - Fetches all pets that have not yet been adopted.

- **searchPetsBySpecies(species: text): Vec<Pet>**
  - Searches for pets by their species.

- **updatePetInfo(updatePetPayload): Result<Pet, Error>**
  - Updates the information of an existing pet.

### Shelter Functions

- **createShelter(ShelterPayload): Result<Shelter, Error>**
  - Creates a new shelter.

- **getShelters(): Vec<Shelter>**
  - Retrieves all shelters.

- **getShelter(id: text): Opt<Shelter>**
  - Fetches a shelter by its ID.

- **getShelterOwner(): Result<Shelter, Error>**
  - Retrieves the shelter associated with the calling principal.

- **updateShelterInfo(updateShelterPayload): Result<Shelter, Error>**
  - Updates the information of an existing shelter.

### Adoption Functions

- **fileForAdoption(AdoptionPayload): Result<AdoptionRecords, Error>**
  - Files an adoption request for a pet.

- **getAdoptionRecords(): Vec<AdoptionRecords>**
  - Retrieves all adoption records.

- **getAdoptionRecord(id: text): Opt<AdoptionRecords>**
  - Fetches an adoption record by its ID.

- **updateAdoptionRecord(updateAdoption): Result<AdoptionRecords, Error>**
  - Updates an existing adoption record.

- **completeAdoption(id: text): Result<AdoptionRecords, Error>**
  - Marks an adoption as completed and updates the pet's status to adopted.

- **failAdoption(id: text): Result<AdoptionRecords, Error>**
  - Marks an adoption as failed.

### Image Handling Functions

- **addPetImage(PetImage): Result<PetImage, Error>**
  - Adds an image to an existing pet.

## Data Structures

### User

- `id: text`
- `principal: Principal`
- `name: text`
- `phoneNumber: text`
- `email: text`
- `address: text`
- `application: Vec<text>`

### Pet

- `id: text`
- `name: text`
- `species: text`
- `breed: text`
- `gender: text`
- `age: text`
- `petImage: text`
- `description: text`
- `healthStatus: text`
- `shelterId: text`
- `status: text`

### Shelter

- `id: text`
- `principal: Principal`
- `name: text`
- `location: text`
- `phoneNumber: text`
- `email: text`
- `pets: Vec<text>`

### AdoptionRecords

- `adoptionId: text`
- `userId: text`
- `petId: text`
- `petName: text`
- `userName: text`
- `userPhoneNumber: text`
- `address: text`
- `reasonForAdoption: text`
- `dateOfAdoption: text`
- `status: text`

## Usage

- Start the local replica and deploy the canister using the commands provided in the [Installation](#installation) section.
- Use the provided functions to manage users, pets, shelters, and adoptions.
- Utilize a frontend to interact with the canister via the provided APIs.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This README should provide a comprehensive overview of the project, enabling developers to understand and work with the system effectively.