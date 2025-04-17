export interface User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    privileges?: {
      isPregnant?: boolean;
      isElderly?: boolean;
      hasDisability?: boolean;
    };
  }