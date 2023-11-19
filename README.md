# giae

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

const displinas = await giae.disciplinas();

const sumarios = await giae.sumarios(displinas[0].idturma, displinas[0].id);
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

## Security considerations

Some hosted GIAEs have HTTPS certificate issues, and this is the reason why there's an option to disable certificate validation (`disableCertificateValidation`). This is not recommended, but it's the only way to get Node to work with those GIAEs.

## LICENSE

Read [LICENSE](LICENSE) file for more information.
