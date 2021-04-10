import { useState, useEffect } from "react";

interface User {
  snusPerWeek: Number;
  snusAtHome: Number;
  loaded: Boolean;
}

export const useUser = () => {
  const [user, setUser] = useState<User>({ snusAtHome: 0, snusPerWeek: 0, loaded: false });
};
