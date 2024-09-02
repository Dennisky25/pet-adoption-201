export async function createClient(client) {
  return window.canister.beautyPalor.createClient(client);
}

export async function getClients() {
  try {
    return await window.canister.beautyPalor.getClients();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getClientByPrincipal() {
  try {
    return await window.canister.beautyPalor.getClientByPrincipal();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getClient(clientId) {
  try {
    return await window.canister.beautyPalor.getClient(clientId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return null;
  }
}
