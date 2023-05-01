## Binge REST API

### Quickstart

### API reference

### Source Code Structure

- controllers contains the controller code, which is responsible for handling the specific logic of the API.

- middleware contains middleware codes for functions such as authentication.

- models contains model codes, which are used to define the database table structure and operation methods.

- routes contains routing code, which is used to define the interface path and request method of the API.

- utils contains tools and methods related to database connection.

### MongoDB Basic Structure

```mermaid
flowchart LR
A[member] --> B[crosskey]
A --> C[username]
A --> D[nickname]
A --> E[password]
A --> F[email]
A --> G[ishold]
A --> H[timezone]
```

```mermaid
flowchart LR
A[note] --> B[crosskey]
A --> C[taggroup]
A --> D[notekey]
A --> E[content]
A --> K[type]
A --> L[istrash]
A --> M[status]
K --> N[1:TODO]
K --> O[2:BOOKMARK]
K --> P[3:NOTE]
M --> R[1:collect]
M --> S[2:organize]
M --> T[3:save]
```

```mermaid
flowchart LR
A[tag] --> B[tagkey]
A --> C[tagname]
A --> D[tagsort]
```
