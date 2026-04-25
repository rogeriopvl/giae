# giae | ![CI status](https://github.com/rogeriopvl/giae/actions/workflows/test.yml/badge.svg?branch=main)

GIAE.pt API wrapper for Node.js.

This library was created to serve my own needs, therefore it is not complete. Feel free to contribute.

## Usage

```js
import Giae from 'giae';

const giae = Giae({
  giaeBaseUrl: 'https://school.com/cgi-bin/webgiae2.exe',
  schoolId: '12345',
  cardNumber: '12345',
  password: 'somepass',
  mode: 'manual',
  disableCertificateValidation: false,
});

// explicitly call login to authenticate, session is stored
await giae.login();

// subsequent requests are now authenticated

const disciplinas = await giae.disciplinas();

const sumarios = await giae.sumarios(disciplinas[0].idturma, disciplinas[0].id);
```

## Supported endpoints and operations

### /loginv2

This method is used explicitly to authenticate the user and get the session cookie. Session is stored for subsequent requests.

```js
login();
```

### /turma

#### disciplinas

To get the list of courses the authenticated user is enrolled in.

```js
disciplinas();
```

#### sumarios

To get all the summaries of a course. If don't know the `classId`, you can call `disciplinas()` to get it. Each course will have the `idturma` attribute set.

```js
sumarios(classId, courseId);
```

The result is wrapped as `{ courseId, data }` so the caller can correlate the
response back to the course it was requested for (the GIAE response itself does
not echo it back).

### /saldo

To get the balance of the authenticated user's school card and digital wallets.

```js
saldo();
```

### /movimentoscartao

#### movimentos

To get the list of card transactions for the authenticated user, filtered by
date range and sector. `sector` is the numeric GIAE sector ID — see the
[`sectors`](#sectors) export below for the mapping. Omit it to get all sectors.

```js
movimentos({ startDate, endDate, sector }); // e.g. sector: 3 // Bar
```

#### extratos

To get the statement for a specific digital wallet.

```js
extratos({ digitalWalletID });
```

#### creditos

To get the list of pending credits for the authenticated user.

```js
creditos();
```

## Named exports

### sectors

A frozen lookup of GIAE sector IDs to their human-readable Portuguese names.
Useful when filtering `movimentos` by sector or rendering transaction lists.

```js
import { sectors } from 'giae';

sectors[3]; // 'Bar'
```

## Caveats

- **Single session per process.** Configuration and the cookie jar are
  module-scoped singletons. Calling `Giae({...})` a second time in the same
  process overwrites the previous config and shares the same session cookie —
  this library is intended for single-user CLI/script use, not for serving
  multiple users from one Node process.

## Security considerations

Some hosted GIAEs have HTTPS certificate issues, and this is the reason why there's an option to disable certificate validation (`disableCertificateValidation`). This is not recommended, but it's the only way to get Node to work with those GIAEs.

## LICENSE

Read [LICENSE](LICENSE) file for more information.
