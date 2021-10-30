import { writable } from 'svelte/store';
import * as fcl from '@onflow/fcl';

const createUserStore = () => {
  const { subscribe, set } = writable(null);
  fcl.currentUser().subscribe((user) => {
    set(user);
  });

  return {
    set,
    subscribe,
    login: fcl.authenticate,
    logout: fcl.unauthenticate,
  };
};

export const user = createUserStore();
