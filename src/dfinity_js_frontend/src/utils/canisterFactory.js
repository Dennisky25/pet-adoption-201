import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as petAdoptionIDL } from "../../../declarations/dfinity_js_backend/dfinity_js_backend.did.js";
import { idlFactory as ledgerIDL } from "../../../declarations/ledger_canister/ledger_canister.did.js";

const petAdoption_CANISTER_ID = "be2us-64aaa-aaaaa-qaabq-cai";
const LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
const HOST = "http://localhost:4943";


export async function getpetAdoptionCanister() {
  return await getCanister(petAdoption_CANISTER_ID, petAdoptionIDL);
}

export async function getLedgerCanister() {
    return getCanister(LEDGER_CANISTER_ID, ledgerIDL);
}

async function getCanister(canisterId, idl) {
    const authClient = window.auth.client;
    const agent = new HttpAgent({
        host: HOST,
        identity: authClient.getIdentity()
    });
    await agent.fetchRootKey(); // This is equivalent to await agent.fetchRootKey() in the previous example
    return Actor.createActor(idl, {
        agent,
        canisterId,
    });
}