const osList: { id: string; name: string }[] = [
  { id: "Win", name: "Windows" },
  { id: "Mac", name: "MacOS" },
  { id: "X11", name: "UNIX" },
  { id: "Linux", name: "Linux" }
];

export const getOs = (navigatorAlias: Navigator) =>
  osList.reduce((acc, os) => {
    const osIndex = navigatorAlias.appVersion.indexOf(os.id);
    if (osIndex !== -1) {
      return os.name;
    }

    return acc;
  }, "Unknown");

export const getBrowserLanguage = (navigatorAlias: Navigator) =>
  (navigatorAlias as any).userLanguage || navigatorAlias.language;
