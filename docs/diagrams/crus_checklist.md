# Create CRUD Checklist

 - /src/lib/<entidad>/<entidad>.ts
    - definir la clase de la entidad, y la interfaz

 - /src/routes/<entidad>/<entidad>.ts
    - Definir y desarrollar los endpoints usando express.Router

 - /src/routes/index.ts
    - Importar el router de la entidad y registrar el path (router.use)

Nota: Son 5 EndPoints y 5 métodos en la librería
    - getAll
    - getById
    - add
    - update
    - delete