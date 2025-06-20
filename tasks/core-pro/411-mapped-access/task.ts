type PagesMap = {
  homepage: string;
  about: string;
  contact: string;
};

type PagesAccess = {
  [K in keyof PagesMap]: boolean;
};

export function checkAccess(map: PagesMap): PagesAccess {
  const access: PagesAccess = {
    homepage: false,
    about: false,
    contact: false,
  };
  for (const key in map) {
    if (map.hasOwnProperty(key)) {
      access[key as keyof PagesAccess] = true;
    }
  }
  return access;
}
