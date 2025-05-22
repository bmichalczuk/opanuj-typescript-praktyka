interface GoogleIdentity {
  id: string;
  provider: 'google';
  userName: string;
}

interface AppleIdentity {
  id: string;
  provider: 'apple';
  userName: string;
}

interface RedditIdentity {
  id: string;
  provider: 'reddit';
  userName: string;
}

type IdentityProvider = 'google' | 'apple' | 'reddit';

interface Identity<T extends IdentityProvider> {
  id: string;
  provider: T;
  userName: string;
}
const users: ReadonlyArray<GoogleIdentity | AppleIdentity | RedditIdentity> = [
  { id: '1', provider: 'google', userName: 'John Doe' },
  { id: '2', provider: 'apple', userName: 'Kate Williams' },
  { id: '3', provider: 'google', userName: 'Jane Doe' },
  { id: '4', provider: 'reddit', userName: 'Alex Smith' },
  { id: '5', provider: 'google', userName: 'Mike Johnson' },
  { id: '6', provider: 'reddit', userName: 'John Doe' },
];

class GoogleIdentityProcessor {
  findById(id: string): GoogleIdentity | undefined {
    return users.find((user) => user.id === id && user.provider === 'google') as
      | GoogleIdentity
      | undefined;
  }

  findByUserName(userName: string): GoogleIdentity | undefined {
    return users.find((user) => user.userName === userName && user.provider === 'google') as
      | GoogleIdentity
      | undefined;
  }
}

class AppleIdentityProcessor {
  findById(id: string): AppleIdentity | undefined {
    return users.find((user) => user.id === id && user.provider === 'apple') as
      | AppleIdentity
      | undefined;
  }

  findByUserName(userName: string): AppleIdentity | undefined {
    return users.find((user) => user.userName === userName && user.provider === 'apple') as
      | AppleIdentity
      | undefined;
  }
}

class RedditIdentityProcessor {
  findById(id: string): RedditIdentity | undefined {
    return users.find((user) => user.id === id && user.provider === 'reddit') as
      | RedditIdentity
      | undefined;
  }

  findByUserName(userName: string): RedditIdentity | undefined {
    return users.find((user) => user.userName === userName && user.provider === 'reddit') as
      | RedditIdentity
      | undefined;
  }
}

export class IdentityProcessor<T extends IdentityProvider> {
  private provider;
  constructor(provider: T) {
    this.provider = provider;
  }
  findById(id: Identity<T>['id']): Identity<T> | undefined {
    return users.find((user) => user.id === id && user.provider === this.provider) as
      | Identity<T>
      | undefined;
  }

  findByUserName(userName: string): Identity<T> | undefined {
    return users.find((user) => user.userName === userName && user.provider === this.provider) as
      | Identity<T>
      | undefined;
  }
}
