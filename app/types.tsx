export type RootStackParamList = {
    Home: undefined;
    login: undefined; // Add all your screen names here
    category:undefined;
    HomeScreen: undefined;
    AffirmationsScreen: { selectedCategories: string[];  customAffirmations: string[]; };
    AffirmList: { selectedCategories: string[], customAffirmations?: string[],customInput: string;};
  };
  